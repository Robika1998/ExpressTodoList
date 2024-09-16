import express, { Request, Response } from 'express';
import connectDB from "./database/database"
import ToDoRoutes from "./routes/ToDoRoutes"
const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(express.json())


app.use("/api", ToDoRoutes)

 

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});