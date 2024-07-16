import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showTodoList, setShowTodoList] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleTodoList = () => {
    setShowTodoList(!showTodoList);
    setShowAddTask(false);
  };

  const toggleAddTodo = () => {
    setShowAddTask(!showAddTask);
    setShowTodoList(false);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="cursor-pointer flex items-start ">
          <Link to="/">To-Do App</Link>
        </div>

        <div className="nav flex list-none justify-center items-center space-x-7 cursor-pointer">
          <Link to="/TodoList" onClick={toggleTodoList}>
            To-Do List
          </Link>
          <Link to="/AddTask" onClick={toggleAddTodo}>
            Add To-Do
          </Link>
        </div>
      </div>
    </nav>
  );
}
