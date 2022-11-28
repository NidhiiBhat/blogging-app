import React, { useEffect, useState } from "react";
import AuthModal from "../modal/AuthModal";

export default function HomeMain() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const showModal = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    localStorage.setItem("IsAuthenticated", false);
  }, []);
  return (
    <div className="flex w-full pl-60 py-2.5 bg-yellow-400 min-h-auto pt-10 pb-20">
      <div className="flex">
        <div className="flex flex-col w-full">
          <h1 className="text-6xl font-serif font-bold">
            M is a place <br /> to write, read and <br />
            connect{" "}
          </h1>
          <h2 className=" my-5 text-xl font-semibold">
            It's eary and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
          <button
            className="mr-auto px-6 py-2.5 rounded-3xl bg-white cursor-pointer"
            onClick={showModal}
          >
            Start Writing
          </button>
        </div>
      </div>
      <AuthModal
        isOpen={isOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}
