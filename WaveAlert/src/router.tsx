import {
  createBrowserRouter
} from "react-router-dom";
import BodyLayout from "./pages/BodyLayout";
import MainLayout from "./pages/MainLayout";
import Home from "./components/Home"
import Alert from "./components/Alert";
import Delimit from "./components/Delimit";
import Emergencias from "./components/Emergencias";
import Plans from "./components/Plans";
import Login from "./components/Login";
import RequireAuth from "./pages/RequireAuth";
import HeatMap from "./components/HeatMap";

const protectedRoutes = {
  element: <RequireAuth/>,
  children:[
  { path: "/alert", element: <Alert/>},
  { path: "/delimit", element: <Delimit/>},
  { path: "/emergency", element: <Emergencias/>},
  { path: "/heatmap", element: <HeatMap/>}

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