import { Request, Response } from "express";
import { prisma } from "../db";
import bcrypt from 'bcrypt';

type CreateMemberBody = {
  name: string;
  email: string;
  password: string;
};

export const createMembers = async (req: Request<{}, {}, CreateMemberBody>, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newMember = await prisma.member.create({
      data: {
        name: req.body.name,
        email: req.body.email,
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
    res.status(500).json({ message: "error" });
  }
}

type LoginBody = {
  email: string;
  password: string;
}

export const loginMember = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const member = await prisma.member.findUnique({
      where: { email },
    });

    if (!member) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      member.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }
    return res.status(200).json({
      message: "Login realizado com sucesso",
      user: {
        id: member.id,
        name: member.name,
        email: member.email,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao realizar login",
    });
  }
};