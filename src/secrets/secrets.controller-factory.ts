import { db } from "../db/client.js"
import { SecretController } from "./secrets.controller.js";
import { SecretRepositoryImpl } from "./secrets.repository.impl.js"
import { SecretServiceImpl } from "./secrets.service.impl.js";

export const makeSecretController = () => {
  const repository = new SecretRepositoryImpl(db);
  const service = new SecretServiceImpl(repository);
  const controller = new SecretController(service);

  return controller;
}