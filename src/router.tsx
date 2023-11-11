import {
  createBrowserRouter
} from "react-router-dom";
import BodyLayout from "./pages/BodyLayout";
import MainLayout from "./pages/MainLayout";
import Home from "./components/Home"
import Alert from "./components/Alert";
import Delimit from "./components/Delimit";


const unprotectedRoutes = [
  { path: "/", element: <Home/> },
  { path: "/alert", element: <Alert/>},
  { path: "/delimit", element: <Delimit/>}
  
];

const bodyLayout = {
   element: <BodyLayout />,
   children: [
      ...unprotectedRoutes,
   ]
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      bodyLayout,
    ]
  },
]);

export default router;