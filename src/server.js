const express = require('express');
require("dotenv/config")
require("express-async-errors");

const AppError = require("./utils/AppError");
const cors = require("cors");

const app = express();
const PORT = 3000;
const routes = require("./routes");


app.use(express.json());
app.use(cors());

const sqliteConnection = require("./database/sqlite")
sqliteConnection()

const uploadConfigs = require("./configs/uploads")
app.use("/files", express.static(uploadConfigs.UPLOADS_FOLDER))
app.use("/files_image", express.static(uploadConfigs.UPLOADS_FOLDER_DISH))

app.use(routes);

app.use((error, request, response, next) => {

if(error instanceof AppError) {

  return response.status(error.statusCode).json({
      status:"error",
      message: error.message
  });
}
console.error(error);

return response.status(500).json({
  status:"error",
  message:"internal server error"
});
});


app.listen(PORT, () => console.log(`O servidor esta rodando na porta ${PORT}`));