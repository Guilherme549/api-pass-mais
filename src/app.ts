import cors from "cors";
import express from "express";
import "express-async-errors";
import listEndpoints from "express-list-endpoints";
import { routes } from "./routes";

const app = express();

// Configurar CORS para permitir requisições de http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(routes);

console.log(listEndpoints(app));

export { app };
