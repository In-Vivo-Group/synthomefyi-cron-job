// Cron job to hit endpoint every 14 sec to keep backend alive always
const cron = require('cron');
const https = require('https');

const backendUrl = 'https://synthome-fyi.onrender.com/papers';
const job = new cron.CronJob('*/14 * * * * *', function () {
    // This function will be executed every 14 seconds
    console.log('Restarting server');

    // Perform an HTTPS GET request to hit any backend api.
    https
        .get(backendUrl, (res) => {
            if (res.statusCode == 200) {
                console.log('Server restarted');
            } else {
                console.error(
                    `Failed to restart server with status code: ${res.statusCode}`
                );
            }
        })
        .on('error', (err) => {
            console.error('Error During Restart:', err.message);
        });
});

// Export the cron job.
module.exports = {
    job,
};
