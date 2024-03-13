"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { FaAngleDown, FaBars } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ApplicationLogo from "../ApplicationLogo";
import styles from "./style.module.css";

const Sidebar = ({ onToggleSidebar }) => {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messageMenuOpen, setMessageMenuOpen] = useState(false);

  const toggleMessageMenu = () => {
    setMessageMenuOpen(!messageMenuOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    onToggleSidebar(!isSidebarCollapsed);
  };

  const isActive = (path) => {
    return router.pathname === path;
  };

  useEffect(() => {
    // Set the initial state based on screen size
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 992); // 992px is the default Bootstrap breakpoint for 'lg'
    };

    // Set initial state on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return (
    <div>
      {/* Button to toggle the sidebar for small screens */}

      {/* Sidebar content */}
      <Nav
        className={`bg-gradients flex h-100 sticky flex-col ${
          isSidebarCollapsed ? "w-20" : " w-64"
        } text-white ${styles.sidebar} ${isSidebarCollapsed ? "collapsed" : ""}`}
        activeKey="/dashboard"
        onSelect={() => {}}
      >
        {/* Toggle Sidebar Button */}
        {isSidebarCollapsed ? (
          <>
            <Nav.Link className={`${styles.sidebarToggle}`} onClick={handleSidebarToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 50 50"
                fill="none"
                className="z-auto"
              >
                <g transform="scale(-1, 1) translate(-50, 0)">
                  <circle cx="25" cy="25" r="25" fill="white" />
                  <circle cx="25" cy="25" r="21.5517" fill="white" />
                  <circle cx="25" cy="25" r="21.5517" fill="url(#paint0_linear_531_6349)" />
                  <path
                    d="M31.5963 18.3672L25.2188 24.7447L31.5963 31.1223"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.7447 18.3672L18.3672 24.7447L24.7447 31.1223"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_531_6349"
                    x1="40.5299"
                    y1="7.56843"
                    x2="8.04383"
                    y2="44.3331"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F8468C" />
                    <stop offset="1" stopColor="#FA8971" />
                  </linearGradient>
                </defs>
              </svg>
            </Nav.Link>
            {/* App Logo with App Name */}
            <Nav.Item className="py-4 px-1">
              <Link href="/dashboard">
                <ApplicationLogo logo="dark" className="w-14 h-10 fill-current text-gray-500" />

                {/* <span className="app-logo">Your App Logo</span>
            <span className="app-name">Your App Name</span> */}
              </Link>
            </Nav.Item>

            {/* Sidebar Menu Items */}
            <div className="text-center mx-auto w-10">
              <Nav.Item>
                <Link
                  href="/dashboard"
                  className={`me-2 flex  ${isActive("/dashboard") ? styles.active : ""}`}
                >
                  <Image src={"/assets/images/home.png"} width={30} height={30} alt="Home icon" />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  href="/find-truck"
                  className={`me-2 flex ${isActive("/find-truck") ? styles.active : ""}`}
                >
                  <Image src={"/assets/images/truck.png"} width={30} height={30} alt="Truck icon" />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  href="/track-load"
                  className={`me-2 flex ${isActive("/track-load") ? styles.active : ""}`}
                >
                  <Image src={"/assets/images/truck_load.png"} width={30} height={30} alt="Track Load icon" />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/load" className={`me-2 flex ${isActive("/load") ? styles.active : ""}`}>
                  <Image src={"/assets/images/load.png"} width={30} height={30} alt="Load icon" />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/drivers" className={`me-2 flex ${isActive("/drivers") ? styles.active : ""}`}>
                  <Image src={"/assets/images/drivers.png"} width={30} height={30} alt="Driver icon" />
                </Link>
              </Nav.Item>
              <Nav.Item>
                <a href="#" className="mt-5 flex justify-content-between" onClick={toggleMessageMenu}>
                  <Image src={"/assets/images/reply_message.png"} width={30} height={30} alt="Message icon" />
                  <span className="self-center">
                    <FaAngleDown />
                  </span>
                </a>
                {messageMenuOpen && (
                  <Link
                    href="/group-sms"
                    className={`me-2 flex ${isActive("/group-sms") ? styles.active : ""}`}
                  >
                    Group SMS
                  </Link>
                )}
              </Nav.Item>
              <Nav.Item>
                <Link href="/chat" className={`me-2 flex ${isActive("/chat") ? styles.active : ""}`}>
                  <Image src={"/assets/images/chat.png"} width={30} height={30} alt="Chat icon" />
                </Link>
              </Nav.Item>
            </div>
          </>
        ) : (
          <>
            <Nav.Link className={styles.sidebarToggle} onClick={handleSidebarToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="25" fill="white" />
                <circle cx="25" cy="25" r="21.5517" fill="white" />
                <circle cx="25" cy="25" r="21.5517" fill="url(#paint0_linear_531_6349)" />
                <path
                  d="M31.5963 18.3672L25.2188 24.7447L31.5963 31.1223"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24.7447 18.3672L18.3672 24.7447L24.7447 31.1223"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_531_6349"
                    x1="40.5299"
                    y1="7.56843"
                    x2="8.04383"
                    y2="44.3331"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F8468C" />
                    <stop offset="1" stopColor="#FA8971" />
                  </linearGradient>
                </defs>
              </svg>
            </Nav.Link>
            {/* App Logo with App Name */}
            <Nav.Item className="p-4 mx-auto">
              <Link href="/dashboard">
                <ApplicationLogo logo="dark" className="w-28 h-20 fill-current text-gray-500" />

                {/* <span className="app-logo">Your App Logo</span>
            <span className="app-name">Your App Name</span> */}
              </Link>
            </Nav.Item>

            {/* Sidebar Menu Items */}
            <div className="text-center mx-auto ">
              <Nav.Item>
                <Link
                  href="/dashboard"
                  className={`text-lg me-2 !text-white space-x-16 flex ${isActive("/dashboard") ? styles.active : ""}`}
                >
                  <span className="icon me-4 text-xl">
                    <Image src={"/assets/images/home.png"} width={30} height={30} alt="Home icon" />
                  </span>{" "}
                  Dashboard
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  href="/find-truck"
                  className={`text-lg me-2 !text-white space-x-16 flex ${isActive("/find-truck") ? styles.active : ""}`}
                >
                  <span className="icon me-4 text-xl">
                    <Image src={"/assets/images/truck.png"} width={30} height={30} alt="Truck icon" />
                  </span>{" "}
                  Find Truck
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  href="/track-load"
                  className={`text-lg me-2 !text-white space-x-16 flex ${isActive("/track-load") ? styles.active : ""}`}
                >
                  <span className="icon me-4 text-xl">
                    <Image
                      src={"/assets/images/truck_load.png"}
                      width={30}
                      height={30}
                      alt="Track Load icon"
                    />
                  </span>{" "}
                  Track Load
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  href="/load"
                  className={`text-lg me-2 !text-white space-x-16 flex ${isActive("/load") ? styles.active : ""}`}
                >
                  <span className="icon me-4 text-xl">
                    <Image src={"/assets/images/load.png"} width={30} height={30} alt="Load icon" />
                  </span>{" "}
                  Load
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  href="/drivers"
                  className={`text-lg me-2 !text-white space-x-16 flex ${isActive("/drivers") ? styles.active : ""}`}
                >
                  <span className="icon me-4 text-xl">
                    <Image src={"/assets/images/drivers.png"} width={30} height={30} alt="Driver icon" />
                  </span>{" "}
                  Drivers
                </Link>
              </Nav.Item>
              <Nav.Item>
                <a
                  href="#"
                  className="text-lg mt-5 !text-white space-x-16 flex justify-content-between"
                  onClick={toggleMessageMenu}
                >
                  <span className="icon me-4 text-xl">
                    <Image
                      src={"/assets/images/reply_message.png"}
                      width={30}
                      height={30}
                      alt="Message icon"
                    />
                  </span>{" "}
                  Message{" "}
                  <span className="self-center">
                    <FaAngleDown />
                  </span>
                </a>
                {messageMenuOpen && (
                  <Link
                    href="/group-sms"
                    className={`text-lg ml-14 !text-white flex ${isActive("/group-sms") ? styles.active : ""}`}
                  >
                    Group SMS
                  </Link>
                )}
              </Nav.Item>
              <Nav.Item>
                <Link
                  href="/chat"
                  className={`text-lg me-2 !text-white space-x-16 flex ${isActive("/chat") ? styles.active : ""}`}
                >
                  <span className="icon me-4 text-xl">
                    <Image src={"/assets/images/chat.png"} width={30} height={30} alt="Chat icon" />
                  </span>{" "}
                  Chat
                </Link>
              </Nav.Item>
            </div>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
