// routes/index.js
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Main from "../pages/Main"; 
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserHome from "../pages/User/UserHome";
import UserProfile from "../pages/User/UserProfile";
import UserResult from "../pages/User/UserResult";
import UserTask from "../pages/User/UserTask";
import AdminHome from "../pages/Admin/AdminHome";
import BDCandidates from "../pages/Admin/BDCandidates";
import BDResults from "../pages/Admin/BDResults";
import BDResult from "../pages/Admin/BDResult";
import BDTasks from "../pages/Admin/BDTasks";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="userhome" element={<UserHome />} />
      <Route path="userprofile" element={<UserProfile />} />
      <Route path="userresults" element={<UserResult />} />
      <Route path="usertasks/:taskNumber" element={<UserTask />} />
      <Route path="adminhome" element={<AdminHome />} />
      <Route path="admin/bdcandidates" element={<BDCandidates />} />
      <Route path="admin/bdresults" element={<BDResults />} />
      <Route path="admin/bdresult" element={<BDResult />} />
      <Route path="admin/bdtasks" element={<BDTasks />} />
    </Route>
  )
);

const Routes = () => <RouterProvider router={router} />;
export default Routes;



//delete "userProfile" URL
