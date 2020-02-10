require("dotenv").config();
const server = require("./api/server");
const db = require("./db");

db.connect(process.env.DB_CONNECT);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

