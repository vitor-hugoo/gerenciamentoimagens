import express from "express";
import imageRoutes from "./routes/imageRoutes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", imageRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
