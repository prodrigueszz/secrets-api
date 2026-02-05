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

export interface SecretService {
  createNewSecret(data: CreateSecretRequestDTO): Promise<CreateSecretResponseDTO>;
  listAllSecrets(data: GetAllSecretsRequestDTO): Promise<GetAllSecretsResponseDTO[] | null>;
  selectSecret(data: SelectSecretRequestDTO): Promise<SelectSecretResponseDTO | null>;
  updateSecretIdentifier(data: UpdateSecretIdentifierRequestDTO): Promise<UpdateSecretResponseDTO>;
  updateSecretPassword(data: UpdateSecretPasswordRequestDTO): Promise<UpdateSecretResponseDTO>;
  deleteSecret(data: DeleteSecretRequestDTO): Promise<DeleteSecretResponseDTO>;
}