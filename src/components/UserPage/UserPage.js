import React, { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import { reload, updateProfile } from "firebase/auth";

export default function UserPage() {
  let [updateUsername, setUpdateUserName] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [profilePic, setProfilePic] = useState(null);

  const editProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: updateUsername,
      password: newPassword,
      // photoURL: profilePic,
    });
    document.getElementById("form").reset();
  };

  return (
    <div className="w-3/4 mx-auto h-full px-20 py-10 ">
      <div>
        <h3 className="text-5xl font-extrabold">
          {auth.currentUser?.displayName}
        </h3>
      </div>
      <div className="mt-10 p-4 bg-white shadow-xl bg-gray-100">
        <h4 className=" text-xl text-gray-600 border-b py-2">
          Personal details
        </h4>
        <h5 className="mt-4">Email: {auth.currentUser?.email}</h5>
        <form className="mt-10" id="form">
          <h5 className="text-gray-600 border-b py-2">Edit Profile</h5>
          <div className="mt-2">
            <label htmlFor="photoURL"></label>
            {auth.currentUser?.photoURL ? (
              <img
                className="w-40 my-10"
                src={auth.currentUser?.photoURL}
                alt={auth.currentUser.displayName}
              />
            ) : (
              <img
                src="https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"
                className="w-40 rounded-full"
                alt={auth.currentUser?.displayName}
              />
            )}
            <input
              type="file"
              id="photoURL"
              onChange={async (event) => {
                setProfilePic(event.target.value);
                console.log(profilePic);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="update-username" className="text-sm capitalize">
              Update Username
            </label>
            <input
              id="update-username"
              type="text"
              className="p-2 rounded-md focus:outline-none border w-1/3"
              onChange={(event) => {
                setUpdateUserName(event.target.value.trim());
                console.log(updateUsername);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="current-password" className="text-sm capitalize">
              Enter New Password
            </label>
            <input
              id="current-password"
              type="password"
              className="p-2 rounded-md focus:outline-none border w-1/3"
              onChange={(event) => {
                console.log(event.target.value);
                setNewPassword(event.target.value);
              }}
            />
          </div>
          <div className="w-1/3 mt-4">
            <button
              className="py-2 px-4 bg-green-700 text-white rounded-md "
              onClick={editProfile}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
