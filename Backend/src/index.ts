import app from "./app";
import { dbConnect } from "./config/db-connect";

const PORT = process.env.PORT || 8090;
const ENV = process.env.NODE_ENV || "development";
app.listen(PORT, async () => {
  console.log(`App is listening at port ${PORT} in ${ENV} environment`);
  dbConnect();
});
