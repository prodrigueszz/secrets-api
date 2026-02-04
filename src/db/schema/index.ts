import { accounts } from "./accounts";
import { secretsTable } from "./secrets";
import { sessions } from "./sessions";
import { users } from "./users";
import { verifications } from "./verifications";

export const  schema = { 
  users,
  sessions,
  verifications,
  accounts,
  secretsTable
}