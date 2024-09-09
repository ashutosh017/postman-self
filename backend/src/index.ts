import express from 'express'
import cors from 'cors'
import { prisma } from './db';

const app = express();
app.use(cors())

const obj:{[key:string]:any} = {
    a:1,b:2
}

const objArr = Array(obj);
// for(let i = 0; i<objArr.length; i++){
    // console.log(objArr[i]);
// 
// }
app.use(express.json())

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

app.post("/sum",(req,res)=>{
    const {a,b}:{a:number,b:number} = req.body
    console.log(a+b);
    res.json({
        sum:a+b
    })


})

app.post("/addToHistory", async(req,res)=>{
        // setResponseBody(JSON.stringify(res));
        // const [a,b,c] = req.body
        // console.log(a,b,c);
        console.log(req.body);
        const {reqMethod, url, reqBody} = req.body
        await prisma.request.create({
            data:{
                reqMethod,reqUrl:url,reqBody
            }
        })
        // await prisma.request.create({
        //     data:{
        //       reqMethod:method==="get"?"get":"post",
        //       reqUrl:url,
        //       reqBody:requestBody
      
        //     }
        //   })
})
app.get("/getAllHistory", async(req,res)=>{
        // setResponseBody(JSON.stringify(res));
        // const [a,b,c] = req.body
        // console.log(a,b,c);
        const response = await prisma.request.findMany();
        res.json(response);
        // await prisma.request.create({
        //     data:{
        //       reqMethod:method==="get"?"get":"post",
        //       reqUrl:url,
        //       reqBody:requestBody
      
        //     }
        //   })
})

app.listen(3000,()=>{
    console.log(("hello world"));
})