import { v4 } from 'uuid'

const USERS = [
  {
    id: v4(),
    name: 'Brice Due',
    email: "brice.due@gmail.com",
    password: "thispass"
  }
]

export class User {
  id: string = ""
  name: string = ""
  email: string = ""
  password: string = ""

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class UserEntity {
  users: User[] = USERS;

  create(user: User) {
    const payload = { ...user, id: v4() };
    this.users.push(payload);

    return payload;
  }

  findByEmail(userEmail: string) {
    const user = this.users.find(({ email }) => email === userEmail);
    if (!user) throw new Error('User does not exist');

    return user;
  }

}