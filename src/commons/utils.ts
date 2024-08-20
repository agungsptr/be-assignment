import { config } from "../config/config";
import * as bcrypt from "bcrypt";

export function hashPassword(password: string): string {
  const saltRounds = config.BCRYPT_ROUND;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
