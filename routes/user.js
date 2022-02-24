const express = require(`express`)
const app = express()

app.use(express.json()) // membaca data dalam format json

let userController = require("../controllers/userController")

// end-point get data user
app.get("/", userController.getDataUser)

// end-point add data user
app.post("/", userController.addDataUser)

// end-point edit data user
app.put("/:id_user", userController.editDataUser)

// end-point delete data user
app.delete("/:id_user", userController.deleteDataUser)

app.post("/auth", userController.authentication)

module.exports = app