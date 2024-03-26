import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

/**
 * Asynchronously inserts a new user into the database.
 * 
 * This function takes an object containing the user's username, password,
 * first name, and last name, and uses the Prisma ORM to create a new user
 * entry in the database. The `username` is stored as the user's email.
 * 
 * @param {Object} userDetails - The details of the user to insert.
 * @param {string} userDetails.username - The username (email) of the user.
 * @param {string} userDetails.password - The password of the user.
 * @param {string} userDetails.firstName - The first name of the user.
 * @param {string} userDetails.lastName - The last name of the user.
 * @returns {Promise<Object>} A promise that resolves with the result of the user creation operation.
 */
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
      email: username, // User's email, derived from the username parameter
      firstname: firstName, // User's first name
      lastname: lastName, // User's last name
      password: password, // User's password (Note: Storing plain-text passwords is not recommended)
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
