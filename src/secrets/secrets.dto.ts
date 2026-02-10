export type CreateSecretRequestDTO = {
  userId: string,
  siteName: string,
  identifier: string,
  password: string
}

export type CreateSecretResponseDTO = {
  id: string
}

export type GetAllSecretsRequestDTO = {
  userId: string
}

export type GetAllSecretsResponseDTO = {
  id: string,
  siteName: string,
  identifier: string,
  password: string,
}

export type SelectSecretRequestDTO = {
  userId: string,
  siteName: string
}

export type SelectSecretResponseDTO = {
  identifier: string,
  password: string
}

export type UpdateSecretIdentifierRequestDTO = {
  userId: string,
  id: string,
  newIdentifier: string,
}

export type UpdateSecretPasswordRequestDTO = {
  userId: string,
  id: string,
  newPassword: string
}

export type UpdateSecretResponseDTO = {
  updated: boolean,
  updatedAt?: string,
}

export type DeleteSecretRequestDTO = {
  userId: string,
  id: string
}

export type DeleteSecretResponseDTO = {
  deleted: boolean,
  deletedAt?: string,
}