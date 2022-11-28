import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import AppContext from "../../context/AppContext";
import LoginModal from "../modal/LoginModal";
import SuccessModal from "../modal/SuccessModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
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
  const [errMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  let contextData = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      console.log(values);

      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(async (res) => {
          console.log(res);
          contextData.setIsAuthenticated(true);
          localStorage.setItem("IsAuthenticated", true);
          const user = res.user;
          console.log(user);
          toast("Login Successful", {
            position: toast.POSITION.TOP_CENTER,
          });
          // toast("Login Success");
          navigate("/blogs");
          // navigate("/blogs");
        })
        .catch((err) => {
          localStorage.setItem("IsAuthenticated", false);
          setErrorMsg(err);
        });
    },

    // navigate("/admin");

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not in proper format")
        .required("Email required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One LowerCase, One Number and One Special Case"
        ),
    }),
  });

  const handleNavigate = () => {
    navigate(`/register`);
  };
  return (
    <div className="max-w-lg mx-auto text-black mt-4 p-10  rounded-md sm:mt-2 sm:p-2 min-w-screen sm:min-w-screen">
      <div>
        <h1 className="text-4xl capitalize text-center p-2 tracking-wider">
          Welcome Back.
        </h1>
      </div>
      <form className="mt-4" id="form" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border p-2 rounded-md focus:outline-none text-black"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-xs">{formik.errors.email}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border p-2 rounded-md focus:outline-none text-black"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="text-red-500 text-xs">
              {formik.errors.password}
            </span>
          )}
        </div>

        <Button name="Login" />
        <div className="text-center mt-4">
          <button
            type="button"
            // onClick={({ signup }) => handleNavigate({ signup })}

            className="hidden underline underline-offset-2 text-blue-700"
          >
            Dont have an account?
          </button>
        </div>
      </form>
      <SuccessModal />
    </div>
  );
}
