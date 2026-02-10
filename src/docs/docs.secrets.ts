/**
 * @openapi
 * components:
 *   schemas:
 *     Secret:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único do secret
 *           example: "0193a5b7-8c4d-7e2f-9a1b-3c4d5e6f7a8b"
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID do usuário proprietário
 *           example: "0193a5b7-1234-5678-9abc-def012345678"
 *         siteName:
 *           type: string
 *           description: Nome do site ou serviço
 *           minLength: 2
 *           maxLength: 30
 *           example: "GitHub"
 *         identifier:
 *           type: string
 *           description: Identificador do usuário (email, username, etc.)
 *           minLength: 3
 *           maxLength: 30
 *           example: "usuario@email.com"
 *         password:
 *           type: string
 *           description: Senha do serviço
 *           minLength: 8
 *           maxLength: 20
 *           example: "SenhaSegura123"
 *
 *     CreateSecretRequest:
 *       type: object
 *       required:
 *         - siteName
 *         - identifier
 *         - password
 *       properties:
 *         siteName:
 *           type: string
 *           description: Nome do site ou serviço
 *           minLength: 2
 *           maxLength: 30
 *           example: "GitHub"
 *         identifier:
 *           type: string
 *           description: Identificador do usuário (email, username, etc.)
 *           minLength: 3
 *           maxLength: 30
 *           example: "usuario@email.com"
 *         password:
 *           type: string
 *           description: Senha do serviço
 *           minLength: 8
 *           maxLength: 20
 *           example: "SenhaSegura123"
 *
 *     UpdateSecretRequest:
 *       type: object
 *       properties:
 *         identifier:
 *           type: string
 *           description: Novo identificador do usuário
 *           minLength: 3
 *           maxLength: 20
 *           example: "novo_usuario@email.com"
 *         password:
 *           type: string
 *           description: Nova senha do serviço
 *           minLength: 8
 *           maxLength: 20
 *           example: "NovaSenha456"
 *       description: Pelo menos um dos campos deve ser fornecido
 *
 *     SecretListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único do secret
 *           example: "0193a5b7-8c4d-7e2f-9a1b-3c4d5e6f7a8b"
 *         siteName:
 *           type: string
 *           description: Nome do site ou serviço
 *           example: "GitHub"
 *         identifier:
 *           type: string
 *           description: Identificador do usuário
 *           example: "usuario@email.com"
 *         password:
 *           type: string
 *           description: Senha do serviço
 *           example: "SenhaSegura123"
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [success]
 *           example: "success"
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: object
 *         message:
 *           type: string
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [fail]
 *           example: "fail"
 *         statusCode:
 *           type: integer
 *           example: 400
 *         errors:
 *           oneOf:
 *             - type: object
 *             - type: string
 *         message:
 *           type: string
 *           example: "Falha na validação"
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Token de autenticação JWT
 *
 * tags:
 *   - name: Secrets
 *     description: Gerenciamento de credenciais e senhas do usuário
 */

/**
 * @openapi
 * /api/v1/secrets:
 *   post:
 *     tags:
 *       - Secrets
 *     summary: /secrets
 *     description: |
 *       Cria um novo secret (credencial) para o usuário autenticado.
 *       
 *       **Regras de validação:**
 *       - `siteName`: 2 a 30 caracteres
 *       - `identifier`: 3 a 30 caracteres
 *       - `password`: 8 a 20 caracteres
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSecretRequest'
 *           example:
 *             siteName: "GitHub"
 *             identifier: "usuario@email.com"
 *             password: "SenhaSegura123"
 *     responses:
 *       201:
 *         description: Secret criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "0193a5b7-8c4d-7e2f-9a1b-3c4d5e6f7a8b"
 *       400:
 *         description: Falha na validação dos dados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "fail"
 *               statusCode: 400
 *               errors:
 *                 siteName:
 *                   _errors:
 *                     - "Este campo deve conter pelo menos 2 caracteres"
 *               message: "Falha na validação"
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/v1/secrets:
 *   get:
 *     tags:
 *       - Secrets
 *     summary: /secrets
 *     description: Retorna todos os secrets do usuário autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de secrets retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SecretListItem'
 *                 message:
 *                   type: string
 *                   example: "Não há Secrets salvas"
 *             examples:
 *               comSecrets:
 *                 summary: Usuário com secrets
 *                 value:
 *                   status: "success"
 *                   statusCode: 200
 *                   data:
 *                     - id: "0193a5b7-8c4d-7e2f-9a1b-3c4d5e6f7a8b"
 *                       siteName: "GitHub"
 *                       identifier: "usuario@email.com"
 *                       password: "SenhaSegura123"
 *                     - id: "0193a5b7-9999-7e2f-9a1b-3c4d5e6f7a8b"
 *                       siteName: "Google"
 *                       identifier: "usuario@gmail.com"
 *                       password: "OutraSenha456"
 *               semSecrets:
 *                 summary: Usuário sem secrets
 *                 value:
 *                   status: "success"
 *                   statusCode: 200
 *                   data: []
 *                   message: "Não há Secrets salvas"
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/v1/secrets/select:
 *   get:
 *     tags:
 *       - Secrets
 *     summary: /secrets/select
 *     description: |
 *       Retorna as credenciais de um secret específico baseado no nome do site.
 *       
 *       Útil para buscar rapidamente as credenciais de um serviço específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: siteName
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *         description: Nome do site para buscar
 *         example: "GitHub"
 *     responses:
 *       200:
 *         description: Secret encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     identifier:
 *                       type: string
 *                       example: "usuario@email.com"
 *                     password:
 *                       type: string
 *                       example: "SenhaSegura123"
 *       400:
 *         description: Parâmetro siteName inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "fail"
 *               statusCode: 400
 *               errors:
 *                 siteName:
 *                   _errors:
 *                     - "Não pode estar vazio"
 *               message: "Requisição inválida"
 *       404:
 *         description: Secret não encontrado para o site especificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "fail"
 *               statusCode: 404
 *               errors: "Not found"
 *               message: "Recurso não encontrado para o site GitHub"
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/v1/secrets/{id}:
 *   patch:
 *     tags:
 *       - Secrets
 *     summary: /secrets/{id}
 *     description: |
 *       Atualiza o identifier ou password de um secret existente.
 *       
 *       **Regras de validação:**
 *       - `identifier`: 3 a 20 caracteres (opcional)
 *       - `password`: 8 a 20 caracteres (opcional)
 *       
 *       **Nota:** Envie apenas um dos campos por requisição. Se ambos forem enviados, apenas o password será atualizado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do secret a ser atualizado
 *         example: "0193a5b7-8c4d-7e2f-9a1b-3c4d5e6f7a8b"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSecretRequest'
 *           examples:
 *             atualizarPassword:
 *               summary: Atualizar senha
 *               value:
 *                 password: "NovaSenhaSegura789"
 *             atualizarIdentifier:
 *               summary: Atualizar identificador
 *               value:
 *                 identifier: "novo_email@email.com"
 *     responses:
 *       200:
 *         description: Secret atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-02-05T14:30:00.000Z"
 *       400:
 *         description: Falha na validação ou erro ao atualizar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validacaoFalhou:
 *                 summary: Erro de validação
 *                 value:
 *                   status: "fail"
 *                   statusCode: 400
 *                   errors:
 *                     body:
 *                       password:
 *                         _errors:
 *                           - "Não pode conter menos de 8 caracteres"
 *                   message: "Request inválida"
 *               atualizacaoFalhou:
 *                 summary: Falha ao atualizar (secret não pertence ao usuário)
 *                 value:
 *                   status: "fail"
 *                   statusCode: 400
 *                   errors: "Requisição inválida"
 *                   message: "Falha ao atualizar"
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/v1/secrets/{id}:
 *   delete:
 *     tags:
 *       - Secrets
 *     summary: /secrets{id}
 *     description: |
 *       Remove permanentemente um secret do usuário autenticado.
 *       
 *       **Atenção:** Esta ação é irreversível.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do secret a ser deletado
 *         example: "0193a5b7-8c4d-7e2f-9a1b-3c4d5e6f7a8b"
 *     responses:
 *       200:
 *         description: Secret deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-02-05T14:30:00.000Z"
 *       400:
 *         description: Falha ao deletar (ID inválido ou secret não pertence ao usuário)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               idInvalido:
 *                 summary: ID inválido
 *                 value:
 *                   status: "fail"
 *                   statusCode: 400
 *                   errors:
 *                     params:
 *                       id:
 *                         _errors:
 *                           - "Invalid uuid"
 *                   message: "Requisição inválida"
 *               deletarFalhou:
 *                 summary: Falha ao deletar
 *                 value:
 *                   status: "fail"
 *                   statusCode: 400
 *                   errors: "Falha ao deletar recurso"
 *                   message: "Ocorreu alguma falha ao tentar deletar o recurso"
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
