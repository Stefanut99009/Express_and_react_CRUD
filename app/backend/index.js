import express from "express"
import mysql from "mysql"
import cors from "cors"
const app=express()

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "test",
    port:3306,
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
  }));
app.get("/",(req,res)=>{
    res.json("Hello this is the backend")
})
app.get("/books",(req,res)=>{
    const q ="Select * from books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/books",(req,res)=>{
    const q ="Insert into books(`title`,`desc`,`cover`, `price`) Values(?)"
    const values=[req.body.title,req.body.desc,req.body.cover,req.body.price]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Books has been added succesfully")
    })
})
app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="Delete From books Where id=?"
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Books has been deleted succesfully")
    })
})
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`=?, `desc`=?, `cover`=?, `price`=? WHERE id=?";
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price];
    
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});

app.listen(8800,()=>{
    console.log("Connected to backend!")
})
