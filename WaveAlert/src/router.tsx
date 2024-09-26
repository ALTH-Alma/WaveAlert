import {
  createBrowserRouter
} from "react-router-dom";
import BodyLayout from "./pages/BodyLayout";
import MainLayout from "./pages/MainLayout";
import Home from "./components/Home"
import Emergencias from "./components/Emergencias";
import Plans from "./components/Plans";
import Login from "./components/Login";
import RequireAuth from "./pages/RequireAuth";
import HeatMap from "./components/HeatMap";
import SendAlert from "./components/SendAlert";
import ReceivedAlert from "./components/ReceivedAlert";
import Monitor from "./components/Monitor";

const protectedRoutes = {
  element: <RequireAuth/>,
  children:[
  { path: "/alert", element: <Monitor/>},
  { path: "/heatmap", element: <HeatMap/>},
  { path: "/send-alert", element: <SendAlert/>},
  { path: "/received-alert", element: <ReceivedAlert/>}

  ]
}

const bodyLayout = {
   element: <BodyLayout />,
   children: [
      protectedRoutes,
      { path: "/", element: <Home/> },
      { path: "/plans", element: <Plans/>}
   ]
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      bodyLayout,
      { path: "/login", element:<Login/>}
    ]
  },
]);

export default router;