//Setting up the postgresSQL connection pool in a Node.js environment using the pg (node-postgres) library and ES Modules.

/*What: imports the pg package. Because pg is often distributed as a CommonJS module, 
you import the whole package as pkg and then destructure the Pool class.

Why: A Pool is used to manage multiple database connections. 
Instead of opening and closing a new connection for every single query (which is slow),
 the Pool keeps a "pool" of open connections and reuses them, making your app much faster.
*/
import pkg from "pg";
const { Pool } = pkg;

//Loading Environment Variables
/*What: It imports the dotenv library and executes the config() function.
Why: This looks for a .env file in your project root and loads the variables inside it into process.env. 
This is a security best practice to keep sensitive data like database passwords out of your actual code.
 */
import dotenv from "dotenv";
dotenv.config();

//Configuring the Connection Pool
/*
What: It creates a new instance of the Pool using a configuration object.
Why: This tells the pg library exactly where and how to find your database.
 */
const pool = new Pool({
  user: process.env.DB_USER,
  /*
  What is the Host?
  Just like you need a URL (like google.com) to visit a website,
  your Node.js application needs a host to find your PostgreSQL database.
   */
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
