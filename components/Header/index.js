"use client";
import { clearAuth } from "@/lib/auth/slice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

const Header = ({ username, avatarUrl, welcome }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const [open, setOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  function logout() {
    dispatch(clearAuth());
    router.push("/");
  }

  return (
    <Navbar
      bg="light"
      variant="light"
      className="w-auto mx-5 my-3 px-4 py-5 shadow-xl justify-content-between"
      style={{ borderRadius: "50px 0px" }}
    >
      {welcome && (
        <div>
          <h6>Welcome Back,</h6>
          <h1 className="text-xl font-black">
            <strong>{username?.first_name}!</strong>
          </h1>
        </div>
      )}

      {/* Right Side - User Avatar and Dropdown */}
      <Nav className="ms-auto">
        <div className="flex flex-row">
          <NavDropdown
            title={
              <div className="inline-block flex-row me-2">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    roundedCircle
                    className="me-2"
                    style={{
                      maxWidth: "30px",
                      maxHeight: "30px",
                    }}
                  />
                ) : (
                  <FaUser className="me-2 inline-block" />
                )}
                &nbsp;
                {username?.first_name + " " + username?.last_name}
              </div>
            }
            id="user-dropdown"
            show={showDropdown}
            onToggle={handleDropdownToggle}
            onSelect={handleDropdownClose}
          >
            <NavDropdown.Item eventKey="profile" onClick={() => router.push("/profile")}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="logout" onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Header;
