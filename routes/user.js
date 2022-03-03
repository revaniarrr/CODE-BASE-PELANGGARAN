const express = require(`express`)
const app = express()
const {body} = require(`express-validator`)

app.use(express.json()) // membaca data dalam format json

const userController = require("../controllers/userController")

const userValidator = require("../middlewares/userValidator")
const authorization = require("../middlewares/authorization")

// end-point get data user
app.get("/", userController.getDataUser)

// end-point add data user
app.post("/",[authorization.authorization, 
    userValidator.validate], userController.addDataUser)

// end-point edit data user
app.put("/:id_user", [authorization.authorization, userValidator.validate],
userController.editDataUser)

// end-point delete data user
app.delete("/:id_user", [authorization.authorization],userController.deleteDataUser)

app.post("/auth", userController.authentication)

module.exports = app