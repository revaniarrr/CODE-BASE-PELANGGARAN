const express = require(`express`)
const app = express()

app.use(express.json()) // membaca data dalam format json

let pelanggaranController = require("../controllers/pelanggaranController")

// end-point get data siswa
app.get("/", pelanggaranController.getDataPelanggaran)

// end-point add data siswa
app.post("/", pelanggaranController.addDataPelanggaran)

// end-point edit data siswa
app.put("/:id_pelanggaran", pelanggaranController.editDataPelanggaran)

// end-point delete data siswa
app.delete("/:id_pelanggaran", pelanggaranController.deleteDataPelanggaran)

module.exports = app