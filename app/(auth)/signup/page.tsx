"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { ArrowLeft } from "lucide-react";

type FormProps = {
  fullName: string;
  email: string;
  password: string;
};

const InitialData: FormProps = {
  fullName: "",
  email: "",
  password: "",
};

const RegisterPage: React.FC = () => {
  const [formDetails, setFormDetails] = useState(InitialData);
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formDetails;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(user);
        setLoading(!loading);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-300 px-4">
      <div className=" animate__animated animate_zoomIn bg-apple-white animation-delay-200 max-w-md w-full glass-morphism rounded-2xl overflow-hidden px-4 py-8 space-y-6">
        <div className="space-y-2 animate-fade-up animation-delay-400">
          <h2 className="text-center text-3xl font-light text-apple-primary">
            Create Account
          </h2>
          <p className="text-center text-sm text-apple-muted">Join us today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-neutral-600 bg-transparent placeholder-transparent focus:outline-none focus:border-apple-accent"
              id="full-name"
              name="fullName"
              type="text"
              onChange={handleChange}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-apple-accent peer-focus:text-sm"
              htmlFor="last-name"
            >
              Full-Name
            </label>
          </div>

          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-neutral-600 bg-transparent placeholder-transparent focus:outline-none focus:border-apple-accent"
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-apple-accent peer-focus:text-sm"
              htmlFor="email"
            >
              Email address
            </label>
          </div>

          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-neutral-600 bg-transparent placeholder-transparent focus:outline-none focus:border-apple-accent"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-apple-accent peer-focus:text-sm"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flex items-start">
            <input
              className="mt-1 h-4 w-4 rounded border-apple-muted text-apple-accent focus:ring-apple-accent transition-colors"
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-apple-muted">
              I agree to the{" "}
              <a href="#" className="text-apple-accent hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-apple-accent hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            className="w-full py-2 px-4 bg-apple-accent hover:bg-blue-600 text-white rounded-lg font-medium button-effect"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <div className="text-center text-sm text-apple-muted animate-fade-up animation-delay-600">
          Already have an account?
          <Link href="/signin">
            <Button
              variant="link"
              className="text-apple-accent hover:text-apple-primary pl-1 p-0 h-auto"
            >
              Sign In
            </Button>
          </Link>
        </div>

        <div className=" animate-fade-up animation-delay-600">
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

export default RegisterPage;
