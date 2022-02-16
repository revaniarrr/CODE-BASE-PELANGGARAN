const express = require(`express`)
const app = express()

app.use(express.json())

// call siswa controller
let siswaController = require("../controllers/siswaController")

// endpoint untuk data siswa
app.get("/", siswaController.getDataSiswa)

// endpoint untuk add siswa
app.post("/", siswaController.addDataSiswa)

// endpoint untuk edit siswa
app.put("/:id_siswa", siswaController.editDataSiswa)

// endpoint untuk delete siswa
app.delete("/:id_siswa", siswaController.deleteDataSiswa)

module.exports = app 