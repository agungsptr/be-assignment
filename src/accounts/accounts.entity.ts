import { Account } from "@prisma/client";

export class AccountEntity implements Account {
  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial);
  }
  id: string;
  type: string;
  balance: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
