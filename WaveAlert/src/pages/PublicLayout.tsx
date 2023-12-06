import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="w-3/4 bg-gray-200 rounded-sm h-auto mt-10 p-4">
      <Outlet />
    </div>
  )
};

export default PublicLayout;
