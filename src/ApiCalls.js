import { useContext } from "react";
import AppContext from "./context/AppContext";

export const baseUrl = "http://localhost:3000";

// export async function post(endpoint, props) {
//   let data, error, loading;
//   try {
//     const response = await fetch(baseUrl + "/" + endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(props),
//     });
//     data = await response.json();
//     if (response.status === 404) {
//       error = "Something went wrong. Please try again later!";
//       // setError("Something went wrong. Please try again later!");
//     }
//     return data;
//   } catch (e) {
//     error = "Something went wrong. Please try again later!";
//   }
//   return [data, error, loading];
// }

// export async function get(endpoint) {
//   let data, error;
//   try {
//     const response = await fetch(baseUrl + "/" + endpoint, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
//     data = await response.json();
//     if (response.status === 404) {
//       error = "Something went wrong. Please try again later!";
//     }
//   } catch (e) {
//     error = e;
//   }

//   return data;
// }

// export async function deletePost(endpoint, props) {
//   let data, error, loading;
//   try {
//     const response = await fetch(baseUrl + "/" + endpoint + props.id, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//     });
//     data = await response.json();
//     if (response.status === 404) {
//       error = "Something went wrong. Please try again later!";
//     }
//   } catch (e) {
//     error = e;
//   }

//   return { data: data, error: error, loading: loading };
// }
