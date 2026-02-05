import { Router } from "express";
import { requireAuth } from "../lib/auth.middleware.js";
import { makeSecretController } from "./secrets.controller-factory.js";

const secretRouter = Router();

const controller = makeSecretController();

secretRouter.use(requireAuth);
secretRouter.post('/', controller.createSecretHandler);
secretRouter.get('/', controller.getAllHandler);
secretRouter.get('/select', controller.selectOneHandler);
secretRouter.patch('/:id', controller.updateHandler);
secretRouter.delete('/:id', controller.deleteHandler);

export default secretRouter;