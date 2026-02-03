import { fastify } from 'fastify';
import { 
  serializerCompiler, 
  validatorCompiler, 
  jsonSchemaTransform,
  type ZodTypeProvider 
} from  'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifyCors } from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'
import 'dotenv/config'

const app = fastify().withTypeProvider<ZodTypeProvider>();
const PORT = Number(process.env.PORT!) || 3000;
 
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Secrets",
      description: "Password manager API",
      version: "1.0.0"
    },
  },
  transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
  routePrefix: '/docs'
})

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log('server listenning at http://127.0.0.1:3333')
  console.log('docs at http://127.0.0.1:3333/docs')
})