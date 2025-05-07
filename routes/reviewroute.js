import express from "express"
const router = express.Router()
import { reviewnew } from "../controller/reviewcontroller.js"
import { showreview } from "../controller/reviewcontroller.js"
import { deletereview } from "../controller/reviewcontroller.js"
import asyncWrap from "../utils/Asyncwrap.js"
import authenticateToken from "../middleware.js/authenticateToken.js"

router.post("/review", authenticateToken, asyncWrap(reviewnew) )
router.get("/review/:postId", authenticateToken,  asyncWrap(showreview) )
router.delete("/review/:id", authenticateToken,  asyncWrap(deletereview))


export default router;


