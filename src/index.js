const cluster = require('cluster');
const os = require('os');

const connectDB = require('./config/db.config');
const app = require('./app');

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  const numCPUs = 2;
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // ---- worker setup ----
  connectDB();                            // MongoDB
  require('./config/redis.config');       // Redis

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}

console.log(`Number of CPUs: ${os.cpus().length}`);