import React, { useEffect, useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "../../ApiCalls";
import AppContext from "../../context/AppContext";
import { auth } from "../../firebase-config";
import {
  getBlog,
  postBlog,
  postEditedBlog,
} from "../../redux/actions/blogs.action";
import BaseImage from "./BaseImage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewStory() {
  let { type } = useParams();
  let navigate = useNavigate();
  let [value, setValue] = useState();
  let [title, setTitle] = useState("");
  let [subtitle, setSubtitle] = useState("");
  let [blogId, setBlogId] = useState(0);

  const [featuredImage, setFeaturedImage] = useState({
    file: null,
    base64URL: "",
  });
  const [selectValue, setSelectValue] = useState("");
  let [error, setError] = useState(false);
  let { editBlogId } = useSelector((state) => state.editBlogId);
  let { blog, loading } = useSelector((state) => state.blog);
  let { blogs } = useSelector((state) => state.blogs);
  let dispatch = useDispatch();

  let categories = [
    "Children",
    "Drama",
    "Documentary",
    "Comedy",
    "Food",
    "Travel",
    "Web Development",
    "Sports",
    "Yoga",
    "Art",
    "Politics",
    "Movies",
    "Health",
  ];
  let contextData = useContext(AppContext);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
    let { file } = featuredImage;
    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setFeaturedImage({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setFeaturedImage({
      file: e.target.files[0],
    });
  };

  useEffect(() => {
    console.log(featuredImage);
  }, [featuredImage]);

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  const imgModules = {
    toolbar: [["image"]],
  };

  let modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (type === "edit") {
      dispatch(getBlog(editBlogId));
      console.log(blog.id);
    }
    console.log(editBlogId.id);
  }, []);
  useEffect(() => {
    if (type === "edit" && blog && blog.title) {
      setTitle(blog.title);
      setFeaturedImage(blog.image);
      setValue(blog.content);
      setSubtitle(blog.subtitle);
      setSelectValue(blog.category);
      setBlogId(blog.id);
    }
  }, [blog]);

  useEffect(() => {
    if (type === "new") {
      setTitle("");
      setFeaturedImage("");
      setValue("");
      setSelectValue("");
    }
  }, [type]);

  const editData = async () => {
    let response = await dispatch(
      postEditedBlog(blogId, {
        title: title,
        subtitle: subtitle,
        image: featuredImage,
        author: auth.currentUser.displayName,
        category: selectValue,
        timestamp: new Date(),
        claps: blog.claps,
        authorImage: auth.currentUser.photoURL,
        content: value,
        id: blog.id,
        authorId: auth.currentUser.uid,
      })
    );
    console.log(blog.id);
    console.log(response);
    toast("Blog Edited Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });

    navigate(`/blogs`);
    setError(false);
  };
  const saveData = async () => {
    if (title !== "" && selectValue !== "" && value !== "") {
      let response = await dispatch(
        postBlog({
          title: title,
          subtitle: subtitle,
          author: auth.currentUser.displayName,
          authorImage: auth.currentUser.photoURL,
          content: value,
          image: featuredImage,
          authorId: auth.currentUser.uid,
          claps: 0,
          comments: [],
          category: selectValue,
          timestamp: new Date(),
        })
      );
      console.log(response);
      toast("Blog Posted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate(`/blogs`);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-10 font-serif">
      <div></div>
      <label className=" hidden" htmlFor="title">
        Title
      </label>

      <textarea
        id="title"
        aria-label="title"
        type="textarea"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError(false);
        }}
        placeholder="Title"
        className=" w-full focus:outline-none outline-none text-6xl font-serif mb-1 whitespace-normal py-2"
      />
      <label className=" hidden" htmlFor="subtitle">
        Sub Title
      </label>
      <textarea
        id="subtitle"
        type="textarea"
        value={subtitle}
        onChange={(e) => {
          setSubtitle(e.target.value);
        }}
        placeholder="In brief.."
        className=" w-full focus:outline-none outline-none text-2xl font-serif mb-1 whitespace-normal py-2"
      />
      <div className="w-full py-2">
        <label htmlFor="categories" className="hidden">
          Category
        </label>
        <select
          id="categories"
          aria-label="categories"
          className="focus:outline-none py-2 border rounded-md cursor-pointer"
          value={selectValue}
          onChange={(e) => {
            handleChange(e);
            setError(false);
          }}
        >
          <option className="focus:outline-none ">Select a Category</option>
          {categories?.map((category, index) => {
            return (
              <option key={index} className="focus:outline-none">
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-4 mb-4">
        <label className="text-xl text-gray-700" htmlFor="add-img">
          Featured Image
        </label>
        <BaseImage
          setFeaturedImage={setFeaturedImage}
          featuredImage={featuredImage}
        />
      </div>

      <label className="mt-5 mb-1 text-xl text-gray-500" htmlFor="content">
        Tell your story..
      </label>

      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        onChange={setValue}
        formats={formats}
        id="content"
        aria-label="content"
        placeholder="Whats on your mind?"
        className="mb-2"
      />

      <button
        onClick={() => {
          if (type === "new") {
            saveData();
          } else {
            editData();
          }
        }}
        aria-label="publish-btn"
        className="bg-green-500 py-2 px-6 rounded-md mt-2 text-white hover:-translate-y-1 focus:translate-y-1 hover:bg-green-600"
      >
        Publish
      </button>
    </div>
  );
}
