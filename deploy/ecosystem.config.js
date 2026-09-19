// PM2 process dosyası — sunucuda: pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "kaan",
      script: "npm",
      args: "start -- --port 3000",
      cwd: "/var/www/kaan",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "500M",
      error_file: "/var/log/pm2/kaan-error.log",
      out_file: "/var/log/pm2/kaan-out.log",
      time: true,
    },
  ],
};
