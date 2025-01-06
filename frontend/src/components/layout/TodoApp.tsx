import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskList } from "./TaskList";
import { Task } from "../type/types";

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/auth/todo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        // Handle unauthorized error
        console.error("Failed to fetch tasks", await response.json());
        return;
      }

      const data = await response.json();
      console.log(data); // Log to verify the response structure
      setTasks(data);
    };

    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (newTask.trim()) {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/auth/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask, description: newTask }),
      });

      const newTaskFromServer = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTaskFromServer]);
      setNewTask("");
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/auth/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Toggle task completion
  const toggleTask = async (id: number) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (taskToToggle) {
      const updatedTask = {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      };
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/auth/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      }
    }
  };

  // Edit task text
  const editTask = async (id: number, newText: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      const updatedTask = { ...taskToEdit, title: newText };

      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/auth/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      }
    }
  };

  return (
    <div>
      <div className='flex space-x-2 mb-6'>
        <Input
          type='text'
          placeholder='Add a new task...'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className='flex-grow'
        />
        <Button onClick={addTask}>
          <Plus className='h-5 w-5' />
        </Button>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
}

