import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import TodoList from "./Components/TodoList";
import TaskEdit from "./Components/TaskEdit";
import Footer from "./Components/Footer";
import AddTask from "./Components/AddTask";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/TodoList" element={<TodoList />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/tasks/:id" element={<TaskEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
