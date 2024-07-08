import { Link, Route, Routes } from "react-router-dom";
// import "./index.scss";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserHome from "./pages/User/UserHome";
import UserProfile from "./pages/User/UserProfile";
import UserResult from "./pages/User/UserResult";
import UserTask from "./pages/User/UserTask";

import AdminHome from "./pages/Admin/AdminHome";
import BDResults from "./pages/Admin/BDResults";
import BDResult from "./pages/Admin/BDResult";
import BDCandidates from "./pages/Admin/BDCandidates";
import BDTasks from "./pages/Admin/BDTasks";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user" element={<UserHome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/results/:taskNumber" element={<UserResult />} />
        <Route path="/tasks/:taskNumber" element={<UserTask />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/results" element={<BDResults />} />
        <Route path="/admin/results/:userId/:taskNumber" element={<BDResult />} />
        <Route path="/admin/candidates" element={<BDCandidates />} />
        <Route path="/admin/tasks" element={<BDTasks />} />
      </Routes>
    </div>
  );
}

export default App;

