import { NextFunction, Request, Response } from "express";
import { SecretService } from "./secrets.service";
import { CreateSecretSchema, DeleteSecretSchema, SelectSecretQuerySchema, UpdateSecretSchema } from "./secrets.schema";
import z from "zod";

export class SecretController {
  constructor(private readonly secretService: SecretService) {}

  createSecretHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const result = await CreateSecretSchema.safeParseAsync(req.body);
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        errors: errors.properties,
        message: "Falha na validação"
      })
    }

    const data = {
      userId: userId,
      siteName: result.data.siteName,
      identifier: result.data.identifier,
      password: result.data.password
    }

    const output = await this.secretService.createNewSecret(data);

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      data: {
        id: output.id
      },
    })
  }

  getAllHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const responseData = await this.secretService.listAllSecrets({ userId });

    if (!responseData) {
      return res.status(200).json({
        status: "success",
        statusCode: 200,
        data: [],
        message: "Não há Secrets salvas"
      })
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: responseData,
    })
  }

  selectOneHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    console.log(req.query);
    const result = await SelectSecretQuerySchema.safeParseAsync(req.query);
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        errors: errors.properties,
        message: "Requisição inválida"
      })
    }

    const { siteName } = result.data;

    const secret = await this.secretService.selectSecret({ userId, siteName });
    if (!secret) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        errors: "Not found",
        message: `Recurso não encontrado para o site ${siteName}`
      })
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: {
        identifier: secret.identifier,
        password: secret.password
      },
    })
  }

  updateHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const result = await UpdateSecretSchema.safeParseAsync({
      params: req.params,
      body: req.body
    })
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        errors: errors.properties,
        message: "Request inválida"
      })
    }

    const id = result.data.params.id;
    const { password, identifier } = result.data.body;

    if (password) {
      const response = await this.secretService.updateSecretPassword({
        userId,
        id,
        newPassword: password
      })

      if (!response.updated) {
        return res.status(400).json({
          status: "fail",
          statusCode: 400,
          errors: "Requisição inválida",
          message: "Falha ao atualizar"
        })
      }
      
      return res.status(200).json({
        status: "success",
        statusCode: 200,
        data: {
          updatedAt: response.updatedAt
        },
      })
    }

    if (identifier) {
      const response = await this.secretService.updateSecretIdentifier({
        userId,
        id,
        newIdentifier: identifier
      })

      if (!response.updated) {
        return res.status(400).json({
          status: "fail",
          statusCode: 400,
          errors: "Requisição inválida",
          message: "Falha ao atualizar"
        })
      }
      
      return res.status(200).json({
        status: "success",
        statusCode: 200,
        data: {
          updatedAt: response.updatedAt
        },
      })
    }
  }

  deleteHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const result = await DeleteSecretSchema.safeParseAsync({
      params: req.params
    })
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        errors: errors.properties,
        message: "Requisição inválida" 
      })
    }

    const id = result.data.params.id;

    const response = await this.secretService.deleteSecret({ userId, id });
    if (!response.deleted) {
      return res.status(400).json({
        status: "fail",
        statusCode: 400,
        errors: "Falha ao deletar recurso",
        message: "Ocorreu alguma falha ao tentar deletar o recurso"
      })
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: {
        deletedAt: response.deletedAt
      },
    })
  }
}