import express from "express";
import projectRoutes from "./routes/projectRoutes";
import errorHandler from "./middlewares/errorHandler";

const port = Bun.env.PORT || 5002;

const app = express();

app.use(express.json());

// Routes
app.use("/api/project", projectRoutes);

// Error handling
app.use(errorHandler);

// App listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
