//  const a=6
//  const b=6
//  console.log(a+b)
//   const arr=[1,2,4,5,6,7]
//   console.log(arr)
//    const person ={
//  name:"samir",
//  Age:12,
//  hobby:"crickter",
//    }
//    console.log(person)
//    console.log(person.name)
//    console.log(person.Age)
//    console.log(person.hob


// eslint-disable-next-line no-undef
const app = require("express")();
// const require=require("express");
// const app=require();
// app.get("/",(req,res)=> {
//   res.send(" hello abebccjcjc  "); 
  
// }); 
 
// app.get("/about",(req,res)=> {
//   res.send(" hello  ma about section ma xu hai"); 
//   // console.log(req)
// }); 

// app.listen(5100,(req,res)=> {
//   console.log("successfully hosted on port 5100");
 
// });
 
app.get("/",(req,res)=>{
 res.json({
  
    message:" hello babeedhjd "
 })
}) 

app.listen(5300,()=>{
  console.log(" sucssfly hosted on port 3000")

}) 
