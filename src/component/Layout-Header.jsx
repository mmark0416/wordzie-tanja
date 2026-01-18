import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function LayoutHeader() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
