import { Secret } from "./secret.js";
import { 
  CreateSecretRequestDTO, 
  CreateSecretResponseDTO, 
  DeleteSecretRequestDTO, 
  DeleteSecretResponseDTO, 
  GetAllSecretsRequestDTO, 
  GetAllSecretsResponseDTO, 
  SelectSecretRequestDTO, 
  SelectSecretResponseDTO, 
  UpdateSecretIdentifierRequestDTO, 
  UpdateSecretPasswordRequestDTO, 
  UpdateSecretResponseDTO 
} from "./secrets.dto.js";
import { SecretRepository } from "./secrets.repository.js";
import { SecretService } from "./secrets.service.js";

export class SecretServiceImpl implements SecretService {
  constructor(private readonly secretRepository: SecretRepository){}

  async createNewSecret(data: CreateSecretRequestDTO): Promise<CreateSecretResponseDTO> {
    const { password } = data;

    const secret = Secret.create(
      data.userId,
      data.siteName,
      data.identifier,
      password
    );

    await this.secretRepository.save(secret);

    const output = {
      id: secret.id
    }

    return output;
  }

  async listAllSecrets(data: GetAllSecretsRequestDTO): Promise<GetAllSecretsResponseDTO[] | null> {
    const { userId } = data;

    const secretsList = await this.secretRepository.getAll(userId);
    if (!secretsList) {
      return secretsList;
    }

    const response = secretsList.map(secret => {
      return { id: secret.id, siteName: secret.siteName }
    });

    return response;
  }

  async selectSecret(data: SelectSecretRequestDTO): Promise<SelectSecretResponseDTO | null> {
    const { userId, siteName } = data;

    const secret = await this.secretRepository.getBySiteName(userId, siteName);
    if (!secret) {
      return secret;
    }

    return {
      identifier: secret.identifier,
      password: secret.password
    }
  }

  async updateSecretPassword(data: UpdateSecretPasswordRequestDTO): Promise<UpdateSecretResponseDTO> {
    const { userId, id, newPassword } = data;

    const secret = await this.secretRepository.getById(id);
    if (!secret) {
      return { updated: false };
    }

    if (secret.userId !== userId) {
      return { updated: false };
    }

    const updatedSecret = Secret.build(
      secret.id,
      secret.userId,
      secret.siteName,
      secret.identifier,
      newPassword
    );

    await this.secretRepository.update(updatedSecret);

    return {
      updated: true,
      updatedAt: new Date().toISOString()
    }
  }

  async updateSecretIdentifier(data: UpdateSecretIdentifierRequestDTO): Promise<UpdateSecretResponseDTO> {
    const { userId, id, newIdentifier } = data;

    const secret = await this.secretRepository.getById(id);
    if (!secret) {
      return { updated: false };
    }

    if (secret.userId !== userId) {
      return { updated: false };
    }

    const updatedSecret = Secret.build(
      secret.id,
      secret.userId,
      secret.siteName,
      newIdentifier,
      secret.password
    );

    await this.secretRepository.update(updatedSecret);

    return {
      updated: true,
      updatedAt: new Date().toISOString()
    }
  }

  async deleteSecret(data: DeleteSecretRequestDTO): Promise<DeleteSecretResponseDTO> {
    const { userId, id } = data;

    const secret = await this.secretRepository.getById(id);
    if (!secret) {
      return { deleted: false };
    }

    if (secret.userId !== userId) {
      return { deleted: false };
    }

    await this.secretRepository.delete(userId, id); 

    return {
      deleted: true,
      deletedAt: new Date().toISOString()
    }
  }
}