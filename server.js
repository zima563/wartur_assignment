import express from "express"
import dotenv from "dotenv"
import categoryRouter from "./src/module/categories/categories.routers.js";
import productRouter from "./src/module/product/products.routers.js";
import { globalError } from "./src/middleware/globalError.js";

const app = express()
const port = 3000

dotenv.config();

app.use(express.json());

app.use("/", express.static("uploads"));

//router setup
app.use("/api/categories",categoryRouter);
app.use("/api/products",productRouter);


app.get('/', (req, res) => res.send('Hello World! ahmed'))

app.use(globalError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))