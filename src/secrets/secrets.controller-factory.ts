import { db } from "../db/client"
import { SecretController } from "./secrets.controller";
import { SecretRepositoryImpl } from "./secrets.repository.impl"
import { SecretServiceImpl } from "./secrets.service.impl";

export const makeSecretController = () => {
  const repository = new SecretRepositoryImpl(db);
  const service = new SecretServiceImpl(repository);
  const controller = new SecretController(service);

  return controller;
}