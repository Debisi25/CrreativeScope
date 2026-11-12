import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
