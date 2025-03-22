"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { Todo } from "@/app/dashboard/page";
import { Calendar } from "@/components/ui/calendar";

interface AddTaskProps {
  onAddTodo: (todo: Omit<Todo, "id" | "completed">) => void;
  onClose?: () => void;
}

export function AddTask({ onAddTodo, onClose }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { title, description, date });

    if (title && description && date) {
      const todoData = {
        title,
        description,
        date: date instanceof Date ? date : new Date(date),
      };
      console.log("Calling onAddTodo with:", todoData);
      onAddTodo(todoData);

      setTitle("");
      setDescription("");
      setDate(new Date());

      if (onClose) {
        onClose();
      }
    } else {
      console.error("Missing required fields:", {
        titleMissing: !title,
        descriptionMissing: !description,
        dateMissing: !date,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          rows={3}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Due Date
        </label>
        <Calendar
          mode="single"
          selected={date || new Date()}
          onSelect={(newDate) => setDate(newDate || new Date())}
          initialFocus
        />
      </div>

      <Button type="submit" className="w-full bg-[#274c77]">
        Add Task
      </Button>
    </form>
  );
}
