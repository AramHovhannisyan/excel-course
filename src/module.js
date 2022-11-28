console.log('module.js working');

async function start() {
  await Promise.resolve('async working');
}

start();