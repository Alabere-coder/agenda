"use client";

import NavBar from "@/components/navbar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="relative sm:p-10 h-full w-screen background-container pb-8 sm:h-screen">
        <NavBar />

        <div className="h-full flex flex-col gap-8 md:gap-10 md:-mt-10 items-center justify-center ">
          <div className="flex flex-col gap-8 md:gap-14">
            <p className="text-center text-gray-50 px-6 max-sm:pt-8">
              Agenda is a task management app to help you stay organized and
              manage your daily activities.
            </p>
            <h1 className="text-center text-7xl max-md:text-5xl font-bold text-gray-100">
              AGENDA
            </h1>
            <p className="text-center font-semibold text-xl text-gray-200">
              Making task easy and simplified
            </p>
          </div>
          <div className=" w-full px-4  lg:px-60 flex max-md:flex-col justify-center items-center gap-6">
            <Card className=" w-full h-full p-4 ">
              <Link
                href={user ? "/dashboard" : "/signin"}
                className="underline underline-offset-[6px] decoration-sky-300"
              >
                <CardTitle className="mb-6 btn-shine">Start Now</CardTitle>
              </Link>

              <CardContent>
                <p className="mt-4 text-gray-400 -ml-6">
                  This is an intuitive todo application designed for individuals
                  to be productive.
                </p>
              </CardContent>
            </Card>
            <Card className="w-full h-full p-4">
              <CardTitle className="text-2xl text-[#219ebc]">
                Target Audience
              </CardTitle>
              <CardContent>
                <p className="mt-2 text-gray-400 -ml-6 text-[15px]">
                  The use of the app include: Students Organizing their
                  assignment and study schedules , managing home household
                  chores and family activities, tracking projects and ideas etc.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <footer></footer>
      </div>
    </>
  );
}
