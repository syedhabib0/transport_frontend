"use client"
import { loadAuthState, setAuth } from "@/lib/auth/slice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function ToastProvider({ children }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const data = loadAuthState()
    if (data) {
      dispatch(setAuth(data))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    
  
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" />
    </>
  );
}