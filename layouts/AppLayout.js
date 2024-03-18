"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/lib/hooks";
import { addChatUser } from "@/utils/firebase/user";
import { handleError } from "@/utils/functions";
import { useEffect } from "react";

const AppLayout = ({ children, welcome }) => {
  const { user } = useAppSelector((state) => state.auth);


  useEffect(() => {
    const addUser = async () => {
      try {
        const userData = {
          about:"Hey, I'm using IWS Chat!",
          created_at:Date.now(),
          email:user.email,
          id:user.id,
          image:user.profile ?? "",
          is_online:true,
          last_active:Date.now(),
          name:user.first_name + " " + user.last_name,
          push_token : ""
        }
        const isUserExist = await addChatUser(user.email,userData)
        console.log(isUserExist);
      } catch (error) {
        handleError(error)
      }
    }
    addUser()
  },[user])



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
