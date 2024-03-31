import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

// Import routes
import usersRoutes from "./routes/users.js";

const app: Express = express();

const PORT: number = 3300;

// Allow to use POSt request bodies
app.use(bodyParser.json());

// Get requests
app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`App listening to PORT: http://localhost:${PORT}`);
});
