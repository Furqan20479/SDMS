import cors from "cors";
import express from "express";
import productRoutes from "./routes/product.routes.js";
import dailySaleRoutes from "./routes/dailySale.routes.js";
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/products", productRoutes);
app.use("/api/daily-Sale", dailySaleRoutes);


export default app;



