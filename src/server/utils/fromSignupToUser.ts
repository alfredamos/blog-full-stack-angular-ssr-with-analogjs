import {SignupUser} from "../validations/auth.validation";
import {Author, Role, User} from "../../generated/prisma/client";

export function fromSignupUserToUser(signupUser: SignupUser) : User {
  return {
    id: undefined as unknown as string,
    name: signupUser.name,
    email: signupUser.email,
    password: signupUser.password,
    image: signupUser.image,
    role: Role.User
  }
}

export function fromSignupUserToAuthor(signupUser: SignupUser) : Author {
  return {
    id: undefined as unknown as string,
    name: signupUser.name,
    email: signupUser.email,
    image: signupUser.image,
    address: signupUser.address,
    phone: signupUser.phone,
    gender: signupUser.gender,
    dateOfBirth: new Date(signupUser.dateOfBirth),
    age: new Date(signupUser.dateOfBirth).getFullYear() - new Date().getFullYear(),
    userId: undefined as unknown as string,
  }
}
