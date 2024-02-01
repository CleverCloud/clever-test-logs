'use strict';

const chalk = require('chalk');
const { CC_DEPLOYMENT_ID, INSTANCE_ID, INSTANCE_NUMBER } = process.env;
const prefix = `${CC_DEPLOYMENT_ID} ${INSTANCE_ID} ${INSTANCE_NUMBER}`;

module.exports = {
  name: 'log-stuffs.routes',
  async register (server, options) {

    setInterval(() => {

      server.log(['test'], `${prefix} SOME TEXT: FOOBAR`);
      server.log(['test'], `${prefix} SOME TEXT: foobar`);
      server.log(['test'], `${prefix} SOME TEXT: foOBAr`);

      server.log(['test'], `${prefix} SOME COLORS: ${chalk.blue('yeah blue')} ${chalk.red('yeah red')} ${chalk.green('yeah green')} }`);

      server.log(['test'], `${prefix} SOME EMOJIS: 🚀🦄🌈🫃🏿`);

      server.log(['test'], `${prefix} RANDOM (${Math.random().toString(36).slice(2)})`);

      console.error(['test'], `${prefix} Error log`)
      console.error(new Error('Error stack'))


      Array
        .from(new Array(10))
        .forEach((_, i) => {
          setTimeout(() => server.log(['test'], `${prefix} SUITE (${i})`), 0);
        });

    }, 1000);

    server.route([

      {
        method: 'GET',
        path: '/{param*}',
        async handler (request, h) {
          return h.response({ 'Hello': 'World' });
        },
      },

    ]);
  },
};
