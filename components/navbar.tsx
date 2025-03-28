"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user); // Directly set isAuth based on user presence
      setIsLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe();
  }, []);

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        router.push("/signin"); // Use Next.js router for navigation
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <div className="h-14 pt-6 px-6 flex justify-between md:justify-around items-center">
      <p className="text-white font-bold text-2xl">Integrity-Media</p>
      {isAuth ? (
        <>
          {/* Desktop Menu */}
          <div className="flex gap-4 max-md:hidden">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Logout</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Logging Out</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to Logout?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Cancel</Button>
                  </DialogClose>
                  <Button onClick={signUserOut} variant="destructive">
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>You are already logged in.</SheetTitle>
                  <SheetDescription asChild>
                    <div className="flex flex-col gap-4 pt-6">
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full">
                          Dashboard
                        </Button>
                      </Link>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            Logout
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Logging Out</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to Logout?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button>Cancel</Button>
                            </DialogClose>
                            <Button onClick={signUserOut} variant="destructive">
                              Logout
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </>
      ) : (
        <>
          {/* Desktop Menu */}
          <div className="flex max-md:hidden">
            <Link href="/signup">
              <Button
                variant="link"
                className="text-white hover:text-blue-600 font-medium text-base"
              >
                Sign-Up
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                variant="link"
                className="text-white hover:text-blue-600 font-medium text-base"
              >
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>
                    Login or Create an Account to continue
                  </SheetTitle>
                  <SheetDescription asChild>
                    <div className="flex flex-col pt-8 gap-4">
                      <Link href="/signin">
                        <Button
                          variant="link"
                          className="text-neutral-600 hover:text-blue-600 font-medium text-base"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button
                          variant="link"
                          className="text-neutral-600 hover:text-blue-600 font-medium text-base"
                        >
                          Register
                        </Button>
                      </Link>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
