import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: {
      email: username,
      password,
      firstname: firstName,
      lastname: lastName,
    },
  });
  console.log(res);
}

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
  const res = await prisma.user.update({
    where: { email: username },
    data: {
      firstname: firstName,
      lastname: lastName,
    },
  });
  console.log(res);
}

async function getUser() {
  const res = await prisma.user.findMany();
  console.log(res);
}

// insertUser("harshith3","harshi123","harshi3","alle3")
// updateUser("harshith1",{firstName:"harshi1",lastName:"malle1"})
// getUser();

module.exports = {
  insertUser,
  updateUser,
  getUser,
};
