"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
}

export function TaskItems({
  todo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDate, setEditedDate] = useState<Date>(todo.date);

  const handleUpdate = () => {
    onUpdateTodo({
      ...todo,
      title: editedTitle,
      description: editedDescription,
      date: editedDate,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg bg-white ${
        todo.completed ? "bg-gray-100" : ""
      }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(editedDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={editedDate}
                onSelect={(date) => date && setEditedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="space-x-4 space-y-4">
            <Button onClick={handleUpdate}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col ">
            <div className="w-full flex justify-between items-center mb-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggleTodo(todo.id)}
              />
              <p className="text-sm text-gray-500 mt-1">
                {format(todo.date, "PPP")}
              </p>
            </div>
            <h3
              className={`text-lg font-semibold ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </h3>
          </div>
          <p className="mt-2">{todo.description}</p>

          <div className="flex items-center space-x-3 pt-4 justify-end">
            <Button onClick={() => setIsEditing(true)} className="">
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your task and remove it from your tasklist.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteTodo(todo.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
}
