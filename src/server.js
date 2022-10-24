const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  try {
    await server.start();
    process.stdout.write(`Server running at ${server.info.uri}`);
  } catch (errMsg) {
    process.stdout.write(errMsg);
  }
};

init();

// Disable 'Block Insecure Private Network Requestts' : chrome://flags/#block-insecure-private-network-requests
