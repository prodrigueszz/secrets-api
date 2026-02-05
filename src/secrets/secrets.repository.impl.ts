import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { SecretRepository } from "./secrets.repository.js";
import { Secret } from "./secret.js";
import { secrets } from "../db/schema/secrets.js";
import { and, eq } from 'drizzle-orm';

export class SecretRepositoryImpl implements SecretRepository{
  constructor(private readonly db: NodePgDatabase<any>){}

  async save(secret: Secret): Promise<void> {
    try {
      await this.db.insert(secrets).
        values({ 
           id: secret.id, 
           userId: secret.userId, 
           siteName: secret.siteName,
           identifier: secret.identifier,
           password: secret.password
        })
    } catch (error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }

  async getAll(userId: string): Promise<Secret[] | null> {
    try {
      const data = await this.db.select()
      .from(secrets)
      .where(
        eq(secrets.userId, userId)
      );
      
      const secretsList = data.map(secret => {
        return Secret.build(
          secret.id,
          secret.userId,
          secret.siteName,
          secret.identifier,
          secret.password
        )
      })

      return secretsList;
      
    } catch(error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }

  async getBySiteName(userId: string, siteName: string): Promise<Secret | null> {
    try {
      const [data] = await this.db.select()
      .from(secrets)
      .where(
        and(
          eq(secrets.userId, userId), 
          eq(secrets.siteName, siteName)
        )
      )
      .limit(1);

      if (!data) {
        return null
      }

      const secret = Secret.build(
        data.id, 
        data.userId, 
        data.siteName, 
        data.identifier, 
        data.password
      );
      return secret;

    } catch(error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }

  async getById(id: string): Promise<Secret | null> {
    try {
      const [data] = await this.db.select()
      .from(secrets)
      .where(
        eq(secrets.id, id)
      )
      .limit(1);

      if (!data) {
        return null
      }

      const secret = Secret.build(
        data.id, 
        data.userId, 
        data.siteName, 
        data.identifier, 
        data.password
      );
      return secret;

    } catch(error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }

  async update(secret: Secret): Promise<void> {
    try {
      await this.db.update(secrets)
      .set({ 
        siteName: secret.siteName,
        identifier: secret.identifier,
        password: secret.password 
      })
      .where(eq(secrets.id, secret.id));
    } catch(error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }

  async delete(userId: string, id: string): Promise<void> {
    try {
      await this.db.delete(secrets).
      where(
        and(
          eq(secrets.id, id), 
          eq(secrets.userId, userId)
        )
      )
    } catch(error) {
      console.error(error);
      throw new Error("Database Error");
    }
  }
}