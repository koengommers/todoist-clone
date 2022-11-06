import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-neutral-900 text-white">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="h-screen flex-grow overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
