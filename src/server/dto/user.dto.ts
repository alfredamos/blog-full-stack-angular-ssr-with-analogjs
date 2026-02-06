import {Role} from "../../generated/prisma/enums";
import {Author} from "../../app/models/Author";
import {User} from "./user";

export class UserDto {
    id: string = "";
    name: string = "";
    email: string = "";
    role: Role = Role.User;
    image: string = "";
    author: Author | null = null;
}

export function toUserDto(user: User
) :UserDto {
    return {
        id: user.id as string,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        author: user.author
    }
}
