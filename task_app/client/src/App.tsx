import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Tasks from "./components/Tasks";
import CreateTask from "./components/CreateTask";
import Task from "./components/Task";
import NotFound from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import EditTask from "./components/EditTask";

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />}>
          <Route index element={<Tasks />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/task/:taskId" element={<Task />} />
          <Route path="/task/update/:taskId" element={<EditTask />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
