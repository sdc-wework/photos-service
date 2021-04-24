require('dotenv').config();
const redis = require('redis');
const host = process.env.REDIS_HOST || '';
const client = redis.createClient({
  host: host,
  port: 6379
});

client.on('error', (error) => console.error(error));

module.exports = client;