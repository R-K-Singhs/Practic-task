const express =require("express");
const app =express()
const sequileze=require("./database")
const modeles=require("./models/allmodel")
const cors =require("cors")


app.use(cors());
app.use(express.json())


app.get("/businesses",async (req,res)=>{
  const data =await modeles.businesses.findAll()
    res.status(200).json(data)
})


app.get("/user/getlist",async (req,res)=>{
    const data =await modeles.users.findAll({
        include:[
            {model:modeles.businesses,
            as:"business"}
        ]
    })
      res.status(200).json(data)
  })
  

app.post("/adduser",async(req,res)=>{
    console.log(req.body)

    try{
        const result =modeles.users.create({
            username:req.body.username,
            password:req.body.password,
            business_id:req.body.business_id
        })
        res.status(200).json(result)

    }catch{
        res.status(500).json({message:"rahul"})
    }


   
})


sequileze.authenticate().then(()=>{
    app.listen(5000,(err)=>{
        if(err) throw err
        console.log("Server is running on port 5000")
    })
})


