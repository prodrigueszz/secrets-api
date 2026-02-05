import swaggerJsdoc from 'swagger-jsdoc';
import { auth } from './lib/auth.js';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Secrets API Documentation',
      version: '1.0.0',
      description: 'Password Manager App'
    },
  },
  apis: ['./src/**/*.ts']
}

export const authSchema = await auth.api.generateOpenAPISchema();

export const swaggerSpec = swaggerJsdoc(swaggerOptions);