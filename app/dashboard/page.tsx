"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { CirclePlus, HardDrive, LayoutDashboard, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AddTask } from "@/components/task/addTask";
import { TaskList } from "@/components/task/taskList";

export interface Todo {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

const Dashboard = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(
        JSON.parse(storedTodos, (key, value) => {
          if (key === "date") return new Date(value);
          return value;
        })
      );
    }
  }, []);

  useEffect(() => {
    try {
      console.log("Saving todos to localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log("Todos saved successfully");
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [todos]);

  const addTodo = (todo: Omit<Todo, "id" | "completed">) => {
    setTodos([
      ...todos,
      { ...todo, id: Date.now().toString(), completed: false },
    ]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/signin");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="py-4 px-4 md:px-20 flex justify-between items-center bg-[#274c77] shadow-md">
        <p className="md:text-xl font-extrabold text-white">Integrity-Media</p>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Logout</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Logging Out</DialogTitle>
                <DialogDescription>
                  Are you sure you want to logout?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex flex-grow">
        <aside className="w-72  max-md:hidden border-r-2 p-4 bg-[#274c77] text-white">
          <h1 className="font-bold text-xl mb-8 pl-2 mt-4">Agenda</h1>
          <div className="flex items-center py-3 px-4 gap-4 bg-slate-200 rounded-lg transition-colors hover:bg-slate-300">
            <LayoutDashboard size={20} className="text-[#274c77]" />
            <p className="text-lg font-medium text-[#274c77]">Dashboard</p>
          </div>
        </aside>

        <div className="w-full text-black">
          <div className="flex items-center border-b-2 pl-4 border-b-[#274c77] bg-[#e7ecef] shadow-sm">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="mr-2">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#274c77] text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                  <SheetDescription asChild>
                    <div className="w-full h-full">
                      <h1 className="font-bold text-xl mb-6 mt-8 text-start text-gray-100">
                        Agenda
                      </h1>
                      <div className="flex items-center py-3 px-4 gap-3 bg-slate-200 rounded-lg">
                        <LayoutDashboard size={20} className="text-[#274c77]" />
                        <p className="text-lg font-semibold text-[#274c77]">
                          Dashboard
                        </p>
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <h2 className="py-6 pl-4 text-xl font-medium">Dashboard</h2>
          </div>

          <div className="">
            <div className="flex p-4 max-sm:flex-col items-center justify-between mb-4">
              <h3 className="font-extrabold max-sm:self-start max-md:pb-6 text-[#274c77] text-xl">
                Create Agenda
              </h3>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                  <Button className="bg-[#274c77] hover:bg-[#1d3557]">
                    <CirclePlus className="mr-2" /> Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <AddTask
                    onAddTodo={addTodo}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="mb-8 px-4">
              <div className="relative max-w-md">
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#274c77] bg-gray-100 placeholder:text-gray-400 focus-visible:ring-[#274c77]"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-center px-1">
              <Card className="w-full md:w-11/12 lg:w-4/5 bg-[#274c77] shadow-lg">
                {filteredTodos.length > 0 ? (
                  <TaskList
                    todos={filteredTodos}
                    onUpdateTodo={updateTodo}
                    onDeleteTodo={deleteTodo}
                    onToggleTodo={toggleTodo}
                  />
                ) : (
                  <div className="flex flex-col items-center py-10 text-white">
                    <p className="text-lg font-semibold mb-6 text-center">
                      No tasks found. Start by adding a new one!
                    </p>
                    <HardDrive size={100} color="white" />
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
