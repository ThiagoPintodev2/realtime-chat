import { Request, Response } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";

interface CreateMemberBody {
  user: {
    name: string;
    email: string;
  };
  password: string;
  password2: string;
}

export const createMembers = async (
  req: Request<{}, {}, CreateMemberBody>,
  res: Response
) => {
  try {
    const { user, password, password2 } = req.body;
    if (password !== password2) {
      return res.status(400).json({
        message: "As senhas não coincidem",
      });
    }
    const memberExists = await prisma.member.findUnique({
      where: {
        email: user.email,
      },
    });

    if (memberExists) {
      return res.status(409).json({
        message: "Email já cadastrado",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newMember = await prisma.member.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(201).json(newMember);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao cadastrar usuário",
    });
  }
};