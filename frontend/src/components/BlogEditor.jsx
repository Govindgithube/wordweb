// import { Link } from "react-router-dom";
import { useContext } from "react";
import { EditorContext } from "../pages/Editor";

// import EditorJs from "@editorjs/editorjs";
// import { tools } from "./Tools";
import toast, { Toaster } from "react-hot-toast";

import blogbanner from "../assets/images/banner/blog-banner.png";

const BlogEditor = () => {
  const {
    blog,
    blog: { title, banner },
    setBlog,
    setEditorState,
  } = useContext(EditorContext);

  // useEffect(() => {
  //   const editor = new EditorJs({
  //     holderId: "textEditor",
  //     data: "",
  //     tools: tools,
  //     placeholder: "Let's write an awesome story",
  //   });
  // }, []);

  const handleBannerUpload = async (e) => {
    const img = e.target.files[0];

    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "word-web");
    data.append("cloud_name", "dhckd5nam");

    try {
      await fetch("https://api.cloudinary.com/v1_1/dhckd5nam/image/upload", {
        method: "POST",
        body: data,
      })
        .then(toast.success("Uploading Image", { duration: 3000 }))
        .then((res) => res.json())
        .then((data) => setBlog({ ...blog, banner: data.url }))
        .catch((err) => console.log(err));

      toast.success("Image Uploaded Successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      // pressed enter key
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };
  const handleContentChange = (e) => {
    const desc = e.target.value;
    setBlog({ ...blog, content: desc });
  };
  const handlePublishBlog = () => {
    setEditorState("publish");
  };

  return (
    <>
      <Toaster />
      <nav className="navbar border-none">
        {/* <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link> */}
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {blog.title === "" ? "New Blog" : title}
        </p>
        <div className="flex gap-2 sm:gap-4 ml-auto">
          <button
            className="btn-dark py-2 text-sm sm:text-lg"
            onClick={handlePublishBlog}
          >
            Publish
          </button>
        </div>
      </nav>

      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video bg-white border-4 border-gray-100 hover:opacity-80">
            <label htmlFor="uploadBanner">
              <img src={banner === "" ? blogbanner : banner} className="z-20" />
              <input
                id="uploadBanner"
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>

          <textarea
            placeholder="Blog Title"
            className="text-4xl font-semibold w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 font-montserrat"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          ></textarea>

          <hr className="w-full opacity-40" />
          {/* <div id="textEditor" className="font-noto text-base"></div> */}
          <div>
            <textarea
              placeholder="let's write an awesome story"
              className="w-full h-[400px] text-xl font-montserrat outline-none mt-10"
              onChange={handleContentChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogEditor;
