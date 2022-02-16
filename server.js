const express = require(`express`)
const app = express()
const PORT = 8080

let routes = [
    { prefix : `/siswa`, route: require(`./routes/siswa`)},
]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)
}

app.listen(PORT, ()=> {
    console.log(`Server run on port ${PORT}`);
})