import React from "react";

export default function Button({ name, className }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        type="submit"
        className={`text-xl border py-2 px-4 rounded-md bg-green-500 hover:-translate-y-1 focus:bg-green-600
            focus:translate-y-1 shadow-xl`}
      >
        {name}
      </button>
    </div>
  );
}
