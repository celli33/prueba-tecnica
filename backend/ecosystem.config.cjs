module.exports = {
    apps: [
      {
        name: 'technical-test',
        script: './build/bin/server.js',
        instances: '2',
        exec_mode: 'cluster',
        merge_logs: true,
        autorestart: true,
      },
    ],
  };