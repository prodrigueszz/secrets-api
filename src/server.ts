import Fastify from 'fastify';
import 'dotenv/config'

const fastify = Fastify({ logger: true});
const PORT = Number(process.env.PORT!) || 3000;

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, adress) => {
  if (err) { 
    fastify.log.error(err); 
    process.exit(1)
  };
  fastify.log.info(adress);
})