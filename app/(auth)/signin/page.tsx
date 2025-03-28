"use client";

import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type FormProps = {
  email: string;
  password: string;
};

const InitialData: FormProps = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formDetails, setFormDetails] = useState(InitialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remembering, setRemembering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load saved email if "Remember Me" was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormDetails((prev) => ({ ...prev, email: savedEmail }));
      setRemembering(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password } = formDetails;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Remember Email if checked
      if (remembering) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      router.push("/dashboard");
    } catch (error) {
      // Use type guard to check if the error is a FirebaseError
      if (error instanceof Error) {
        switch (error.message) {
          case "auth/user-not-found":
            setError("User not found. Please check your email.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          case "auth/too-many-requests":
            setError("Too many attempts. Please try again later.");
            break;
          case "auth/invalid-email":
            setError("Invalid email address. Please check your email.");
            break;
          case "auth/network-request-failed":
            setError("Network error. Please check your internet connection.");
            break;
          default:
            setError("An error occurred. Please try again.");
        }
      } else {
        // Handle non-Firebase errors
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
      setFormDetails((prev) => ({ ...prev, password: "" })); // Clear password field
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-neutral-300 px-4">
      <div className="bg-apple-white animate-scale-in animation-delay-200 max-w-md w-full glass-morphism rounded-2xl overflow-hidden px-4 py-8 space-y-6">
        <div className="space-y-2 animate-fade-up animation-delay-400">
          <h2 className="text-center text-3xl font-light text-apple-primary">
            Welcome Back
          </h2>
          <p className="text-center text-sm text-apple-muted">
            Sign in to your account
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 
                text-neutral-500 bg-transparent placeholder-transparent 
                focus:outline-none focus:border-gray-300"
              id="email"
              name="email"
              type="email"
              value={formDetails.email}
              onChange={handleChange}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 
                text-sm transition-all peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-2 peer-focus:-top-3.5 
                peer-focus:text-apple-accent peer-focus:text-sm"
              htmlFor="email"
            >
              Email address
            </label>
          </div>

          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 
                text-neutral-500 bg-transparent placeholder-transparent 
                focus:outline-none focus:border-gray-300"
              id="password"
              name="password"
              type="password"
              value={formDetails.password}
              onChange={handleChange}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 
                text-sm transition-all peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-2 peer-focus:-top-3.5 
                peer-focus:text-apple-accent peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-apple-muted">
              <input
                className="mr-2 h-4 w-4 rounded border-apple-muted text-apple-accent focus:ring-apple-accent transition-colors"
                type="checkbox"
                checked={remembering}
                onChange={() => setRemembering(!remembering)}
              />
              <span>Remember me</span>
            </label>

            <Button
              variant="link"
              className="text-sm text-apple-accent hover:text-apple-primary p-0 h-auto"
            >
              Forgot your password?
            </Button>
          </div>

          <Button
            className="w-full py-2 px-4 bg-apple-accent hover:bg-blue-600 text-white rounded-lg font-medium button-effect"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center text-sm text-apple-muted animate-fade-up animation-delay-600">
          Do not have an account yet?
          <Link href="/signup">
            <Button
              variant="link"
              className="text-apple-accent hover:text-apple-primary pl-1 p-0 h-auto"
            >
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="animate-fade-up animation-delay-600">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-apple-muted hover:text-apple-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
