import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header"
const BodyLayout = () => {
  const loc = useLocation()
  return (
    <div className="flex flex-col items-center">
      <Header></Header>
      <div className="w-[90%] border-t-indigo-100 rounded-xl h-auto mt-28 p-4 mb-8 justify-center items-center">
        <Outlet />
      </div>
    </div>
  )
};

export default BodyLayout;
