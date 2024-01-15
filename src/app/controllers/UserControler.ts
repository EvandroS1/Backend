import { Request, Response, Router } from "express";
import express from "express";
import UserRepository from "../repositories/UserRepository";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";

const userRouter = Router();

userRouter.use(express.json()); // Middleware para analisar o corpo da requisição

userRouter.get("/", async (_req: Request, res: Response): Promise<Response> => {
  const users = await UserRepository.getUsers();
  const total = users.length;

  return res.status(200).json({ users, total });
});

userRouter.get(
  "/getByCnpj/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const userCnpj = req.query.cnpj as string;
      const user = await UserRepository.getByCnpjUsers(userCnpj);

      if (user === null) {
        return res.status(404).json({ error: "Usuario não encontrado" });
      }

      return res.status(200).json([user]);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
);

const isValidCNPJ = (cnpj: string): boolean => {
  return cnpjValidator.isValid(cnpj);
};
const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  return emailRegex.test(email);
};
const isValidCep = (cep: string): boolean => {
  const cepRegex = /^\d{5}-\d{3}$/;
  return cepRegex.test(cep);
};
const isValidTel = (tel: string): boolean => {
  const telefoneRegex =
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
  return telefoneRegex.test(tel);
  // Nenhum DDD iniciado por 0 é aceito, e nenhum número de telefone pode iniciar com 0 ou 1.
  // Exemplos válidos: +55 (11) 98888-8888 / 9999-9999 / 21 98888-8888 / 5511988888888
};

userRouter.post("/", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { cnpj, cep, email, telefone } = req.body;

    if (!isValidCNPJ(cnpj)) {
      return res.status(400).json({ error: "CNPJ inválido" });
    }

    if (!cep || typeof cep !== "string") {
      return res.status(400).json({ error: "Formato inválido para o CEP" });
    }
    if (!isValidCep(cep)) {
      return res.status(400).json({ error: "CEP inválido" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Formato inválido para o e-mail" });
    }
    if (!isValidTel(telefone)) {
      return res
        .status(400)
        .json({ error: "Formato invalido para o telefone" });
    }
    const users = await UserRepository.postUsers(req.body);
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

  try {
    const updatedUser = await UserRepository.deleteUsers(userId);

    if (updatedUser === null) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuario excluido!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default userRouter;
