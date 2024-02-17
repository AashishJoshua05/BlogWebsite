import { useState } from "react";
import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom";

const modules = {
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

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", file[0]);
    e.preventDefault();
    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center border-8 w-1/3">
        <form onSubmit={createNewPost} className="flex flex-col space-y-8 overflow-hidden">
          <input
            type="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 mt-2"
          />
          <input
            type="Summary"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="p-2"
          />
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files);
            }}
            className="p-2"
          />
          <ReactQuill
            value={content}
            onChange={(newValue) => setContent(newValue)}
            modules={modules}
            formats={formats}
            className="h-32"
          />
        <button className="absolute bottom-64 bg-red-700 border-2 px-2 py-1 rounded-md border-black" >Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
