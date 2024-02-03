import express from "express"
const router = express.Router()

import userRouter from "./user.js"
import messagesRouter from "./messages.js"

router.use(userRouter)
router.use(messagesRouter)

export default router