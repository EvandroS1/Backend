import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
  return userRepository.find();
};
const getByCnpjUsers = async (userId: string) => {
  const existingUser = await userRepository.findOne({
    where: { cnpj: userId },
  });
  if (existingUser) {
    return existingUser;
  }

  if (!existingUser) {
    return null; // Retorna null se o usuário não for encontrado
  }
};

const postUsers = async (userData: IUser[]): Promise<User[]> => {
  const insertedUsers = await userRepository.save(userData);
  return insertedUsers;
};

const updateUsers = async (
  userId: string,
  updateData: IUser
): Promise<User | null> => {
  console.log(userId);

  // Verifique se o usuário existe antes de tentar atualizar
  const existingUser = await userRepository.findOne({
    where: { id: Number(userId) },
  });

  if (!existingUser) {
    return null; // Retorna null se o usuário não for encontrado
  }

  await userRepository.update(Number(userId), updateData);

  // Busca o usuário atualizado e o retorna
  const updatedUser = await userRepository.findOne({
    where: { id: Number(userId) },
  });
  return updatedUser as User;
};

const deleteUsers = async (userId: string) => {
  // Verifique se o usuário existe antes de tentar atualizar
  const existingUser = await userRepository.findOne({
    where: { id: Number(userId) },
  });

  if (!existingUser) {
    return null; // Retorna null se o usuário não for encontrado
  }

  await userRepository.delete(Number(userId));
};

export default { getUsers, postUsers, updateUsers, deleteUsers, getByCnpjUsers };
