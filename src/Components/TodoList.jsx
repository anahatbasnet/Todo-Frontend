import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8888/tasks");
      const formattedTasks = response.data.map((task) => ({
        ...task,
        priority: capitalizeFirstLetter(task.priority),
        status: capitalizeFirstLetter(task.status),
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/tasks/${id}`);
      alert("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-center mt-5 mb-3">To-Do List</h2>

      <table className="table-auto mx-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Task</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="bg-white border">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.description}</td>
              <td className="px-4 py-2">
                {format(new Date(task.dueDate), "MM/dd/yyyy")}
              </td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">{task.priority}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/tasks/${task.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                  Edit
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2"
                  onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
