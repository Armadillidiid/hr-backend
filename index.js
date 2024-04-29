import routes from './src/routes/auth.route.js'

// ESM
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (req, res) {
  res.send({ hello: 'world' })
})

fastify.register(routes)

/**
 * @type {import('fastify').RouteShorthandOptions}
 * @const
 */
const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' }
      }
    }
  }
}

fastify.post('/', async (request, reply) => {
  return { hello: 'world' }
})

export default async (fastify, opts) => {
  try {

fastify.get('/', function (req, res) {
  res.send({ hello: 'world' })
})
    // await fastify.listen({ port: 3001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
// start()
