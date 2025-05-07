const { Client } = require("pg");

async function waitForDB() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  for (let i = 0; i < 10; i++) {
    try {
      await client.connect();
      console.log("Database is ready!");
      await client.end();
      return;
    } catch (err) {
      console.log("Waiting for database...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw new Error("Database not available");
}

waitForDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
