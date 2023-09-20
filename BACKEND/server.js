require('dotenv').config()
const express = require('express')
const cors = require("cors")
const usersRouter = require('./routes/users/usersRoute')
const accountsRouter = require('./routes/accounts/accountsRoute')
const transactionsRouter = require('./routes/transactions/transactionsRoute')
const globalErrHandler = require('./middlewares/globalErrHandler')
require("./config/dbConnect")

const app = express()

//middleware
app.use(express.json())
//cors middleware
app.use(cors())
//users route
app.use("/api/v1/users",usersRouter)
//account route
app.use("/api/v1/accounts",accountsRouter)
//transactions route
app.use("/api/v1/transactions",transactionsRouter)
//Error handler
app.use(globalErrHandler) 

//listen to server
const PORT = process.env.PORT || 9000
app.listen(PORT,console.log("server is running on port",PORT))