import { TaskItems } from "./taskItems";

interface Todo {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
}

export function TaskList({
  todos,
  onUpdateTodo,
  onDeleteTodo,
  onToggleTodo,
}: TodoListProps) {
  return (
    <div className="space-y-4 m-4">
      {todos.map((todo) => (
        <TaskItems
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </div>
  );
}
