import Blog from "../model/blog.js";
import User from "../model/user.js";

const publishBlog = async (req, res) => {
  const { title, banner, description, content, tag } = req.body;
  // console.log(req.body);
  if (!title && !description && !content) {
    return res.status(400).json({
      success: false,
      message: "Provide all the information for blog",
    });
  }

  try {
    const newBlog = new Blog({
      author: req.userid,
      title: title,
      banner: banner,
      description: description,
      content: content,
      tag: tag,
    });

    await newBlog.save();

    const updateUser = await User.findByIdAndUpdate(
      req.userid,
      {
        $push: { blogs: newBlog._id },
      },
      {
        new: true,
      }
    );

    if (updateUser) {
      res.status(201).json({
        success: true,
        message: "Blog published successfully",
      });
    }
  } catch (err) {
    console.log("Error while publishing blog");
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to publish blog, Internal server error",
    });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const response = await Blog.find().populate("author");
    if (response) {
      res.status(200).json({
        success: true,
        message: "All post fetched successfully",
        blogs: response,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "No blog found",
      });
    }
  } catch (err) {
    console.log("Error while fetching all blogs");
    console.log(err);
  }
};
const getSingleBlog = async (req, res) => {
  const blog_id = req.params.blog_id;
  if (!blog_id) {
    return res.status(400).json({
      success: false,
      message: "Provide blog id",
    });
  }

  try {
    const response = await Blog.findById(blog_id).populate("author");
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Blog fetched successfully",
        blog: response,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No blog found",
      });
    }
  } catch (err) {
    console.log("Error while fetching single blog");
    console.log(err);
  }
};
const updateBlog = async (req, res) => {
  const blog_id = req.params.blog_id;
  const { title, content, tag } = req.body;
  const user_id = req.userid;
  if (!blog_id) {
    return res.status(400).json({
      success: false,
      message: "Blog id not provided",
    });
  }

  try {
    const blog = await Blog.findById(blog_id);

    if (blog.author != user_id) {
      return res.status(401).json({
        success: false,
        message:
          "You cannot update someone else blog, Unauthorized access detected",
      });
    }

    blog.title = title;
    blog.content = content;
    blog.tag = tag;

    await blog.save();

    return res.status(202).json({
      success: true,
      message: "Blog successfully updated",
    });
  } catch (err) {
    console.log("Error while updating blog");
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to update blog at the moment, Internal server error",
    });
  }
};
const deleteBlog = async (req, res) => {
  const user_id = req.userid;
  const blog_id = req.params.blog_id;

  try {
    const blog = await Blog.findById(blog_id);
    if (blog == null) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author != user_id) {
      return res.status(401).json({
        success: false,
        message:
          "You cannot delete someone else blog, Unauthorized access detected",
      });
    }

    await Blog.deleteOne({ _id: blog_id });
    const updateUser = await User.updateOne(
      { _id: user_id },
      { $pull: { blogs: blog_id } }
    );

    if (updateUser) {
      return res.status(202).json({
        success: true,
        message: "Blog deleted successfully",
        user: updateUser,
      });
    }
  } catch (err) {
    console.log("Error while deleting the post");
    console.log(err);
  }
};

export { publishBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog };
