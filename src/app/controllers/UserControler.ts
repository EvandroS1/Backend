import { Request, Response, Router } from "express";
import express from "express";
import UserRepository from "../repositories/UserRepository";

const userRouter = Router();

userRouter.use(express.json()); // Middleware para analisar o corpo da requisição

userRouter.get("/", async (_req: Request, res: Response): Promise<Response> => {
  const users = await UserRepository.getUsers();
  return res.status(200).json(users);
});
userRouter.get(
  "/getById/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.query.id as string;
      const user = await UserRepository.getByIdUsers(userId);
      console.log(user);
      if (user === undefined) {
        return res.status(404).json({ error: "Usuario não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

userRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserRepository.postUsers(req.body);
    // console.log(users);
    return res.status(201).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.put("/", async (req: Request, res: Response): Promise<Response> => {
  const userId = req.query.id as string;

  if (!userId) {
    return res
      .status(400)
      .json({ error: 'Parâmetro "id" ausente na consulta' });
  }

  // Lógica para lidar com a URL http://localhost:3333/users/?id=1 no método PUT
  try {
    const updateData = req.body;

    const updatedUser = await UserRepository.updateUsers(userId, updateData);

    if (updatedUser === null) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

userRouter.delete("/", async (req: Request, res: Response) => {
  const userId = req.query.id as string;

  if (!userId) {
    return res
      .status(400)
      .json({ error: 'Parâmetro "id" ausente na consulta' });
  }

  // Lógica para lidar com a URL http://localhost:3333/users/?id=1 no método PUT
  try {
    const updatedUser = await UserRepository.deleteUsers(userId);
    return res.status(200).json({ message: "Usuario excluido!" });

    if (updatedUser === null) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default userRouter;
