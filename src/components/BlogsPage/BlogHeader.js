import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { auth } from "../../firebase-config";
import Button from "../buttons/Button";
import LogoutModal from "../modal/LogoutModal";

export default function BlogHeader() {
  let navigate = useNavigate();
  let [homeBtnActive, setHomeBtnActive] = useState(true);
  let [userBtnActive, setUserBtnActive] = useState(false);

  const navigation = [
    { name: "Login", href: "/login" },
    { name: "Signup", href: "/signup" },
  ];
  let contextData = useContext(AppContext);

  // const logout = () => {
  //   auth.signOut();
  //   contextData.setIsAuthenticated(false);
  //   localStorage.setItem("IsAuthenticated", false);
  //   navigate("/");
  // };
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (btn, state) => {
    btn(state);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOk = () => {
    setIsOpen(false);
  };
  const showModal = () => {
    setIsOpen(true);
  };
  function countWords(str) {
    return str?.trim().split(/\s+/).length;
  }

  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <div className="flex flex-col py-8 bg-white shadow duration-300 fixed h-full items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <img
              className="w-2/5"
              src="https://cdn-icons-png.flaticon.com/128/5968/5968854.png"
              alt="avatar"
            />
          </div>
          <div className="mt-20">
            <div
              className="border-b border-gray-300"
              // onClick={setBtnActive(true)}
              onClick={() => {
                handleNavClick(setHomeBtnActive, true);
                handleNavClick(setUserBtnActive, false);
              }}
            >
              <Link
                to="/blogs
            "
              >
                {homeBtnActive ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mb-10"
                      aria-label="home-page-btn-active"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </>
                ) : (
                  <>
                    <label htmlFor="home-btn" className="hidden">
                      Home
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mb-10"
                      id="home-btn"
                      aria-label="home-page-btn"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </>
                )}
              </Link>
            </div>
            <div
              onClick={() => {
                handleNavClick(setHomeBtnActive, false);
                handleNavClick(setUserBtnActive, true);
              }}
              className="mt-10"
            >
              <Link to={"/blogs/userpage"}>
                {userBtnActive ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                      aria-label="user-profile-page-btn-active"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                      aria-label="user-profile-page-btn"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </>
                )}
              </Link>
            </div>

            <div
              onClick={() => {
                handleNavClick(false);
              }}
              className="mt-10"
            >
              <Link to="/new-story/new">
                <label htmlFor="new-blog-btn" className="hidden">
                  Write a new blog
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  id="new-blog-btn"
                  aria-label="new-blog"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <button
            // onClick={logout}
            className="py-4 px-4 rounded-full bg-gray-400 text-black"
            id="logout-button"
            name="logout-button"
            aria-label="logout-button"
            onClick={() => {
              // handleDelete(blog);
              showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span className="hidden">Logout</span>
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
