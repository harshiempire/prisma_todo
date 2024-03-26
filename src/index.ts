import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

async function insertUser({
  username,
  password,
  firstName,
  lastName,
}: {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}) {
  const res = await prisma.user.create({
    data: {
      email: username,
      firstname: firstName,
      lastname: lastName,
      password: password,
    },
  });
  return res;
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
  return res;
}

// insertUser("harshith3","harshi123","harshi3","alle3")
// updateUser("harshith1",{firstName:"harshi1",lastName:"malle1"})
// getUser();

export { insertUser, updateUser, getUser };
