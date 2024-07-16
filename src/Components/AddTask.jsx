import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    priority: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleAdd = async () => {
    try {
      const response = await axios.post(`http://localhost:8888/tasks`, task);
      console.log("Response:", response.data); // Log the response data
      alert("Task added successfully");
      setRedirect(true);
    } catch (error) {
      console.error(
        "Error adding the task",
        error.response || error.message || error
      ); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dueDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Due Date must be today or in the future.");
        setTask((prevTask) => ({
          ...prevTask,
          dueDate: today.toISOString().split("T")[0],
        }));
      } else {
        setTask((prevTask) => ({
          ...prevTask,
          [name]: value,
        }));
      }
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Task</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title">
            Task
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-black p-1 rounded-sm"
            placeholder="Enter task"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-textarea mt-1 block w-full border border-black p-1 rounded-sm"
            rows="3"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dueDate">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="form-input mt-1 block w-full border border-black p-1 rounded-sm"
            min={getTodayDate()}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 "
            htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="form-select mt-1 block w-full border border-black p-1 rounded-sm"
            required>
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="In-progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="form-select mt-1 block w-full border border-black p-1 rounded-sm"
            required>
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3">
            Add Task
          </button>
          <button
            type="button"
            onClick={() => setRedirect(true)}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
