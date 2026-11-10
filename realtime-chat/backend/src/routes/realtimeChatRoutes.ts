import express = require("express");
import { createMembers } from "../controllers/realtimeChatControllers"

const router = express.Router()

// Cria Novo Membro
router.post('/create-user', createMembers)

export default router;