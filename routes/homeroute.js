import express from "express"
import authenticateToken from "../middleware.js/authenticateToken.js";
import {createPost, PostEdit}  from "../controller/postcontroller.js";
import { showAllPost } from "../controller/postcontroller.js";
import { detailedPost } from "../controller/postcontroller.js";
// import { saveAllPosts } from "../controller/postcontroller.js";
import { deletePost } from "../controller/postcontroller.js";
import asyncWrap from "../utils/Asyncwrap.js";
import multer from "multer";
import { storage } from "../cloudcofig.js";
const upload = multer({ storage });
const router = express.Router();

// router.get("/saved-data", saveAllPosts)
router.get("/show",  asyncWrap(showAllPost) )
router.post("/create-post-form", authenticateToken, upload.single("image"), asyncWrap(createPost))
router.get("/detailedpost/:id",  asyncWrap(detailedPost) )
router.put("/edit/:id", authenticateToken, asyncWrap(PostEdit))
router.delete("/post/:id", authenticateToken, asyncWrap(deletePost))


export default router;