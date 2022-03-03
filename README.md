### Express Model View Controller Pattern (MVC)

**Berikut adalah** gambaran bagaimana kita dapat menerapkan sebuah konsep **MVC** pada aplikasi **NodeJS** kita mengunakan **Express Framework**, yang nantinya bisa teman - teman terapkan saat membuat sebuah aplikasi dengan mengunakan `Nodejs like Express` atau yang lainnya.

![](https://i.imgur.com/aosyh92.png)

#### Cara Menjalankan:

- install semua module terlebih dahulu dengan mengetikan `npm install`

#### Struktur Folder:

- controllers
- libs
- middlewares
- models
- routes
- configs

#### Penjelasan Strukture Folder:

- **controller** tempat yang berisi semua logic dari aplikasi tersebut seperti untuk membuat tambah data mahasiswa, hapus data mahasiswa dll

- **libs** tempat yang berisi untuk customisasi library yang telah kita install seperti **jwt, bcrypt** yang nantinya bisa kita custom menjadi sebuah fungsi tersendiri untuk digunakan

- **middleware** tempat yang berisi untuk custome function middleware yang digunakan untuk keperluan **auth jwt, auth role** dll

- **model** tempat yang berisi untuk melakukan pembuatan schema baik itu dengan **mongodb or mongoose** yang nantinya akan digunakan oleh **controller** sebagai bagian dari logic aplikasi itu sendiri

- **route** tempat yang berisi untuk pembuatan routing pada aplikasi untuk meneruskan fungsi dari **controller ke view**

- **config** tempat yang berisi untuk pembuatan konfigurasi dari **database** atau yang lainnya

## Berikut adalah contoh dari masing - masing fungsi:

#### Core Controller

```
const req = require("express/lib/request")
let md5 = require("md5")
let jwt = require('jsonwebtoken')

const {validationResult} = require(`express-validator`)

// memanggil file model untuk User
let modelUser = require("../models/index").user


exports.getDataUser = (request, response) => {
    modelUser.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.addDataUser = (request, response) => {
    let error = validationResult(request)
    if(!error.isEmpty()){
        return response.json(error.array())
    }
    
    // tampung data request
    let newUser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password:  md5(request.body.password)
    }

    modelUser.create(newUser)
    .then(result => {
        return response.json({
            message: `Data user berhasil ditambahkan`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataUser = (request, response) => {
    let id = request.params.id_user
    let dataUser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password: md5(request.body.password)
    }

    modelUser.update(dataUser, { where: {id_user: id} })
    .then(result => {
        return response.json({
            message: `JIAKH Data user berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteDataUser = (request, response) => {
    let id = request.params.id_user

    modelUser.destroy({where: {id_user: id}})
    .then(result => {
        return response.json({
            message: `JIAKH Data user berhasil dihapus`
        })
    })   
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.authentication = async(request, response) => {
    let data = {
        username: request.body.username,
        password: md5(request.body.password)
    }

    // validasi (cek data di tabel user)
    let result = await modelUser.findOne({where: data})

    if (result) {
        // data ditemukan

        // payload adalah data/informasi yang akan dienkripsi
        let payload = JSON.stringify(result) // konversi dari bentuk objek ke JSON
        let secretKey = `Sequelize itu sangat menyenangkan`

        // generate token
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token
        })
    }else{
        // data tidak ditemukan
        return response.json({
            logged : false,
            message: `Who the fuck are you?`
        })
    }
}
```

#### Core Model

```
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id_user:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_user: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};
```

#### Core Route

```
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
```

#### Config Connection

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "pelanggaran_siswa2",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "pelanggaran_siswa2",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "pelanggaran_siswa2",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
