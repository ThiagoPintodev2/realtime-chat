import { Request, Response } from "express";
import { prisma } from "../db";

type CreateMemberBody = {
  name: string;
  email: string;
  password: string;
};

export const createMembers = async (req: Request<{}, {}, CreateMemberBody>, res: Response) => {
  try {
    const newMember = await prisma.member.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
    })
    res.json(newMember)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
}