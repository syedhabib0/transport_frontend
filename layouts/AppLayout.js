"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/lib/hooks";

const AppLayout = ({ children, welcome }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      {user && (
        <div className="min-h-screen flex bg-gray-100">
          <Sidebar onToggleSidebar={() => {}} />
          <div className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto">
            <Header username={user} welcome={welcome} />
            <main className="container">{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default AppLayout;
