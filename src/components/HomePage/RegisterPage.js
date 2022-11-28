import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import { auth, storage } from "../../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import { ToastContainer, toast } from "react-toastify";

// toast.configure();
export default function RegisterPage() {
  //   const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  //   const register = async () => {};

  //   const login = async () => {};
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profilePicture: null,
      password: "",
      confirmPassword: "",
    },
    onSubmit: function (values) {
      console.log(values);
      formik.resetForm();
      setImage(formik.values.profilePicture);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(async (res) => {
          const user = res.user;

          await updateProfile(user, {
            displayName: formik.values.name,
            photoURL:
              "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png",
          });
          toast("Registered Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/blogs");

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err.message);
        });
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").required(),
      // .test(
      //   "is-full-name",
      //   "Please enter both firstname and Last name",
      //   (value) => {
      //     let nameArray = value.split(" ");
      //     return nameArray.length >= 2;
      //   }
      // ),
      email: Yup.string()
        .email("Email is not in proper format")
        .required("Email required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One LowerCase, One Number and One Special Case"
        ),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Password doesnt match"),
    }),
  });

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto w-full text-black mt-2 p-10 rounded-md tracking-wider">
      <div>
        <h2 className="text-3xl capitalize text-center p-2">Join Medium.</h2>
      </div>
      <form className="mt-4" id="form" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label className="text-md mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            className="border p-2 rounded-md focus:outline-none text-black"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="name"
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-xs">{formik.errors.name}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-md mb-2" htmlFor="email">
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
        {/* <div className="my-4 flex flex-col items-center">
          
          <input
            type="file"
            name="profilePicture"
            value={formik.values.profilePicture}
            onChange={formik.handleChange}
            className="my-2"
          />
          
        </div> */}
        <div className="flex flex-col">
          <label className="text-md mb-2" htmlFor="password">
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
        <div className="flex flex-col">
          <label className="text-md mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border p-2 rounded-md focus:outline-none text-black"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>
        <div className="text-left">
          <p className="text-red-500 text-sm">{errorMsg}</p>
        </div>
        <Button name="Sign up" />
        {/* <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleNavigate}
            className="underline underline-offset-2 text-blue-700"
          >
            Already have an account?
          </button>
        </div> */}
      </form>
    </div>
  );
}
