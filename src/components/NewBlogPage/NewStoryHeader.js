import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import LogoutModal from "../../components/modal/LogoutModal";

export default function NewStoryHeader() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const showModal = () => {
    setIsOpen(true);
  };

  // const handleLogout = () => {
  //   localStorage.setItem("IsAuthenticated", false);
  //   auth.signOut();
  //   navigate("/");
  // };
  return (
    <div className="max-w-4xl mx-auto px-10">
      <div className="flex justify-between items-center">
        <div className="">
          <Link to={"/blogs"}>
            <img
              className="w-14"
              src="https://cdn-icons-png.flaticon.com/128/5968/5968854.png"
              alt="avatar"
            />
          </Link>
        </div>
        <div>
          <button
            className="p-2 rounded-full bg-gray-400 px-4 hover:-translate-y-1 focus:translate-y-1 shadow-md"
            onClick={() => {
              showModal();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <LogoutModal
        isOpen={isOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        // modal={<LogoutModal />}
      />
    </div>
  );
}
