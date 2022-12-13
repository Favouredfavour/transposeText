import express from "express";

const router = express.Router();

//controller
import { save_message, get_message } from "../controllers/messageController.js";

router.post("/send-message", save_message);
router.get("/get-messages", get_message);

export default router;
