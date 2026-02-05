import { Secret } from "./secret.js";

export interface SecretRepository {
  save(secret: Secret): Promise<void>;
  getAll(userId: string): Promise<Secret[] | null>;
  getBySiteName(userId: string, siteName: string): Promise<Secret | null>;
  getById(id: string): Promise<Secret | null>;
  update(secret: Secret): Promise<void>;
  delete(userId: string, id: string): Promise<void>;
}