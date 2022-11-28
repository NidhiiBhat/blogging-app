import { registerVersion } from "firebase/app";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../modal/AuthModal";
import LoginModal from "../modal/LoginModal";
import LoginPage from "./LoginPage";

export default function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setIsLoginOpen(false);
  };
  const handleOk = () => {
    setIsOpen(false);
    setIsLoginOpen(false);
  };
  const showModal = () => {
    setIsOpen(true);
  };
  const showLoginModal = () => {
    setIsLoginOpen(true);
  };

  return (
    <header>
      <div className="header flex items-center w-full justify-around bg-yellow-400 px-0 py-5 border-b border-black">
        <div className="header-left flex items-center">
          <svg
            width="25"
            height="25"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z" />
          </svg>
        </div>
        <div className="header-right flex items-center">
          <div className="header-right-options flex items-center">
            {/* <div className="mx-2.5 cursor-pointer">
              <span>Our Story</span>
            </div>
            <div className="mx-2.5 cursor-pointer">
              <span>Membership</span>
            </div>
            <div className="mx-2.5 cursor-pointer">
              <span>Write</span>
            </div> */}
            {/* <Link to={"/login"}> */}
            <div className="mx-2.5 cursor-pointer">
              <span onClick={showLoginModal}>Sign In</span>
            </div>
            {/* </Link> */}

            <div>
              {/* <Link to={"/register"}> */}
              <span>
                <button
                  className="outline-none border-none px-4 py-2.5 mx-2.5"
                  onClick={showModal}
                >
                  Get Started
                </button>
              </span>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={isOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modal={<registerPage />}
      />
      <LoginModal
        isLoginOpen={isLoginOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        modal={<LoginPage />}
      />
    </header>
  );
}
