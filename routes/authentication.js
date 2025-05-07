import express from "express"
import {signup} from "../controller/authentication.js";
import asyncWrap from "../utils/Asyncwrap.js";
import login from  "../controller/login.js";

const router = express.Router();

router.post("/signup", asyncWrap(signup))
router.post("/login", login)


export default router;