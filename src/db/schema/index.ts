import { accounts } from "./accounts.js";
import { secrets } from "./secrets.js";
import { sessions } from "./sessions.js";
import { users } from "./users.js";
import { verifications } from "./verifications.js";

export const  schema = { 
  users,
  sessions,
  verifications,
  accounts,
  secretsTable: secrets
}