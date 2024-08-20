import { usersService } from "./users.service";
import { UserEntity } from "./users.entity";
import { comparePassword } from "../commons/utils";

export class UserController {
  async signUp(req: { id: string; email: string; password: string }) {
    try {
      const user = await usersService.create(new UserEntity(req));
      if (user) return true;
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async signIn(req: { email: string; password: string }) {
    try {
      const user = await usersService.findOneByEmail(req.email);
      if (user) {
        if (comparePassword(req.password, user.password)) {
          return true;
        }
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export const userController = new UserController();
