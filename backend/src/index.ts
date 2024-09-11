import express from 'express'
import cors from 'cors'
import { prisma } from './db';

const app = express();
app.use(cors())


app.use(express.json())


app.post("/api/sum",(req,res)=>{
    const {a,b}:{a:number,b:number} = req.body
    console.log(a+b);
    res.json({
        sum:a+b
    })


})

app.post("/api/addToHistory", async(req,res)=>{
        console.log(req.body);
        const {reqMethod, url, reqBody} = req.body
        await prisma.request.create({
            data:{
                reqMethod,reqUrl:url,reqBody
            }
        })

})
app.get("/api/getAllHistory", async(req,res)=>{
        const response = await prisma.request.findMany();
        res.json(response);
})

app.listen(3000,()=>{
    console.log(("hello world"));
})