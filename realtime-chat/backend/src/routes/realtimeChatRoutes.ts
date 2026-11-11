import express = require("express");
import { createMembers, loginMember } from "../controllers/realtimeChatControllers";

const router = express.Router()

// Criar Novo Membro
router.post('/create-user', createMembers)
// Login do Usuario
router.post('/login', loginMember)

export default router;