import express from "express";
const app=express();

import { createPool } from "mysql2/promise";

 

const pool=createPool({

    user:'root',

    password:'zej6j4lqjhjWWEhO2Xg2',

    host:'containers-us-west-114.railway.app',

    port:6262,

    database:'railway'

})

app.get('/login', async (req,res)=>{
  const nombre=req.query.nombre
  const contrasena=req.query.contrasena
  const [result]=await pool.query(`select * from usuario where nombre='${nombre}' and contrasena='${contrasena}'`)
   
  if(result[0].nombre==nombre && result[0].contrasena==contrasena){
      res.send("Usuario correcto")
  }else {
      res.send("Usuario incorrecto")
  }
});

app.get('/',(req,res)=>{

  res.send(`<h1>hola prras</h1>`)      

})

 

app.get('/usuarios',async (req,res)=>{

    const [result] = await pool.query('select * from usuario')

    res.json(result[0])      

  })

 

  app.get('/agregarusuario',async (req,res)=>{

    const nombre=req.query.nombre

    const contrasena=req.query.contrasena

    const correo=req.query.correo

    const tienda=req.query.tienda  

    const [result]=await pool.query(`INSERT INTO usuario (nombre, contrasena, correo, tienda) VALUES ('${nombre}', '${contrasena}', '${correo}','${tienda}')`)

    res.json(result[0])      

  })

 

app.listen(process.env.PORT || 3000)

console.log("Servidor corriendo en el puerto 3000")