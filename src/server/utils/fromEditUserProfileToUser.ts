import {Author, Role, User} from "../../generated/prisma/client";
import {EditUserProfile} from "../validations/auth.validation";

export function fromEditUserProfileToUser(editUserProfile: EditUserProfile) : User {
  return {
    id: undefined as unknown as string,
    name: editUserProfile.name,
    email: editUserProfile.email,
    password: editUserProfile.password,
    image: editUserProfile.image,
    role: Role.User
  }
}

export function fromEditUserUserToAuthor(editUserProfile: EditUserProfile) : Author {
  return {
    id: undefined as unknown as string,
    name: editUserProfile.name,
    email: editUserProfile.email,
    image: editUserProfile.image,
    address: editUserProfile.address,
    phone: editUserProfile.phone,
    gender: editUserProfile.gender,
    dateOfBirth: new Date(editUserProfile.dateOfBirth),
    age: new Date().getFullYear() - new Date(editUserProfile.dateOfBirth).getFullYear(),
    userId: undefined as unknown as string,
  }
}
