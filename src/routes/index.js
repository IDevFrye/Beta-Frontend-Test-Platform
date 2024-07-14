import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Protected, handleProtected } from "./Protected";
import { isAuthenticated } from "./Helpers";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserHome from "../pages/User/UserHome";
import UserProfile from "../pages/User/UserProfile";
import UserResult from "../pages/User/UserResult";

import UserTask from "../pages/User/UserTask";
import AdminHome from "../pages/Admin/AdminHome";
import BDResults from "../pages/Admin/BDResults";
import BDResult from "../pages/Admin/BDResult";
import BDCandidates from "../pages/Admin/BDCandidates";
import BDTasks from "../pages/Admin/BDTasks";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Protected />}>
        <Route
          index
          element={<UserHome />}
          loader={async () => await handleProtected()}
        />
       
        <Route path="/useresults/:taskNumber" element={<UserResult />} />
        {/* <Route path="/usertasks/:taskNumber" element={<UserTask />} /> */}
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/admin/bdresults" element={<BDResults />} />
        <Route
          path="/admin/bdresult/:userId/:taskNumber"
          element={<BDResult />}
        />
        <Route path="/admin/bdcandidates" element={<BDCandidates />} />
        <Route path="/admin/bdtasks" element={<BDTasks />} />
      </Route>
      <Route
        path="/login"
        element={<Login />}
        loader={async () => await isAuthenticated()}
      />
      <Route
        path="/register"
        element={<Register />}
        loader={async () => await isAuthenticated()}
      />
      <Route
        path="/testhome"
        element={<UserHome />}
        loader={async () => await isAuthenticated()}
      />
       <Route path="/userprofile" element={<UserProfile />} /> 
       <Route path="/usertasks/:taskNumber" element={<UserTask />} />
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};
export default Index;

//delete "userProfile" URL
