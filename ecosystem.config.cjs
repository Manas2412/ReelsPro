module.exports = {
    apps: [
        {
            name: 'reels-pro',
            script: 'npm',
            args: 'start',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
