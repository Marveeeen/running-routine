import { useState } from "react";
import { PlusCircle, CheckCircle, Circle } from "lucide-react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Stretch before run", completed: false },
    { id: 2, text: "Prepare running gear", completed: true },
    { id: 3, text: "Fill water bottle", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2">
        <h2 className="text-lg font-semibold">Todo List</h2>
      </div>
      <div className="p-4">
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={addTodo}
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.completed ? (
                <button className="focus:outline-none focus:ring-2 focus:ring-green-500">
                  <CheckCircle className="text-green-500 dark:text-green-400" />
                </button>
              ) : (
                <button className="focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <Circle className="text-gray-400 dark:text-gray-500" />
                </button>
              )}
              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
