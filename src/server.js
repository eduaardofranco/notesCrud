require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const cors = require("cors")
const express = require('express');

const routes = require("./routes")

//execute database
migrationsRun();

const app = express();
app.use(cors())

//defining what type of file whe are working(in this case json)
//now the api knows what type of information we are working with
app.use(express.json())

//show avatar image inside uploads folder
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

//defining that these are the routes of my application
app.use(routes)



app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    console.error(error);
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    })
})



const PORT = 3333;
// app is litening the port 3333 and when de application starts it will consolelog which port is running
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));