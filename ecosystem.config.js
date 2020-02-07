module.exports = {
  apps: [
    {
      name: "Qarun",
      script: "./server.js",
      watch: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      instances: 0,
      exec_mode: "cluster"
    }
  ]
};
// pm2 start ecosystem.config.js -i 0 --watch --env production
// pm2 delete all
// pm2 restart ecosystem.config.js
// pm2 reload ecosystem.config.js
// pm2 stop ecosystem.config.js
// pm2 delete ecosystem.config.js
//
// # Fork mode
// pm2 start server.js --name Qarun
// # Cluster mode
// pm2 start server.js -i 0        # Will start maximum processes with LB depending on available CPUs
// pm2 start server.js -i max      # Same as above, but deprecated.
// # Delete All Apps And Process
// pm2 delete all