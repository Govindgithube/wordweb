import express from "express";
import {
  publishBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controller/blog-controller.js";
import verifyToken from "../middleware/verify-token.js";

const router = express.Router();

router.post("/new", verifyToken, publishBlog);
router.get("/all", getAllBlogs);
router.get("/:blog_id", getSingleBlog);
router.put("/:blog_id", verifyToken, updateBlog);
router.delete("/:blog_id", verifyToken, deleteBlog);

export default router;
