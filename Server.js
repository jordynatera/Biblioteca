import { error } from "console";
import express from "express";
import mysql from "mysql";

const app = express()
app.use(express.json())

const BDConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Biblioteca"
});

app.get("/ListadoLibros", (req, res) => {
    const query = "SELECT * FROM Libro";
    BDConnection.query( query, (error, data) => {
        if (error) return res.json(error);
        return res.json(data); 
    });
});

app.post("/InsertarLibro", (req, res) => {

    const query = "INSERT INTO Libro (`IdLibro`,`NombreLibro`, `AutorLibro`) VALUES (?)";
    const values = [
        req.body.IdLibro,
        req.body.NombreLibro,
        req.body.AutorLibro 
    ];

    BDConnection.query(query, [values], (error, data) => {
        if(error) return res.json(error);
        return res.json("Ha sido añadido el libro");
    });
});

app.put("/ActualizarLibro/:IdLibro", (req, res) => {

    const IdLibro = req.params.IdLibro;
    const query = "UPDATE Libro SET `NombreLibro` = ?, `AutorLibro` = ? WHERE IdLibro = ?"
    const values = [
        req.body.NombreLibro,
        req.body.AutorLibro
    ]
    
    BDConnection.query(query, [...values, IdLibro], (error, data) => {
        if(error) return res.json(error);
        return res.json("Ha sido actualizado el libro");
    });
});

app.delete("/BorrarLibro/:IdLibro", (req, res) => {

    const IdLibro = req.params.IdLibro;
    const query = "DELETE FROM Libro WHERE IdLibro = ?"

    BDConnection.query( query, IdLibro, (error,data) =>{
        if(error) return res.json(error);
        return res.json("Ha sido eliminado el Libro");
    })
});

app.get("/", (req, res) => {
    res.json("Mi biblioteca");
});

app.listen(9000, () => {
    console.log("connected to server, port 9000")
});