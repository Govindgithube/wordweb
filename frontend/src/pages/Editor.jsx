import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { createContext, useContext, useState } from "react";

import BlogEditor from "../components/BlogEditor";
import PublishBlog from "../components/PublishBlog";

const blogStructure = {
  title: "",
  banner: "",
  content: "",
  tag: "",
  description: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  const { user } = useContext(UserContext);
  const [blog, setBlog] = useState(blogStructure);

  const [editorState, setEditorState] = useState("editor");

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState }}
    >
      {user ? (
        editorState == "editor" ? (
          <BlogEditor />
        ) : (
          <PublishBlog />
        )
      ) : (
        <Navigate to="/signup" />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;
