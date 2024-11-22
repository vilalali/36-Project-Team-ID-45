const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: "localhost",
    port: 6379
  }
});

redisClient.on("connect", () => console.log('Redis connected successfully'));
redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.connect();

redisClient.set("testKey", "testValue", (err, reply) => {
  if (err) console.error(err);
  console.log(reply); // Should print OK
});

redisClient.get("testKey", (err, value) => {
  if (err) console.error(err);
  console.log(`Retrieved value: ${value}`); // Should print testValue
});
