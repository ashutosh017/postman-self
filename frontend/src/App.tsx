import { useEffect, useState } from "react";
import axios from "axios";

import "react-json-view-lite/dist/index.css";
import { JsonViewer } from "@textea/json-viewer";
// api for testing
// https://jsonplaceholder.typicode.com/posts

interface req{
  reqMethod:string,
  reqUrl:string,
  reqBody:string
}
const backendUrl = "https://postman-self.onrender.com"

export default function App() {
  const [method, setMethod] = useState("get");
  const [url, seturl] = useState("");
  const [requestBody, setRequestBody] = useState(``);
  const [response, setResponseBody] = useState("");
  const [headers, setHeaders] = useState("");
  const [history, setHistory] = useState<req[]>([]);
  useEffect(()=>{
    (async()=>{
      const requests = await axios.get(`${backendUrl}/api/getAllHistory`);
      console.log(requests);
      setHistory(requests.data);

    })()

  },[])

  const handleSubmit = async () => {
    console.log(
      "method: ",
      method,
      "\n",
      "url: ",
      url,
      "\n",
      "req body: ",
      requestBody
    );
    // const res = await fetch(url,{
    //   method:method,
    //   body:requestBody
    // })
    // console.log(res);

    
    if (method === "get") {
      console.log("method is get");
      const res = await axios.get(url);
      setResponseBody(JSON.stringify(res.data));
    } 
    else if(method==="post" && headers!==""){
      const obj = JSON.parse(headers)
      const res = await axios.post(url,JSON.parse(requestBody),{...obj})
      setResponseBody(JSON.stringify(res.data));

    }
    else if (method === "post") {
      const res = await axios.post(url, JSON.parse(requestBody));
      setResponseBody(JSON.stringify(res.data));
      console.log(res);
    }

    axios.post(`${backendUrl}/api/addToHistory`,{
      reqMethod:method,
      url:url,
      reqBody:requestBody,      
    })
  };

  // const json = JSON.parse(response)
  if (response) {
    const x = JSON.parse(response);
    console.log("json: ", x);
  }
  return (
   <div className="flex w-screen bg-zinc-900 min-h-screen max-h-full justify-center">
    <div className=" w-1/4 bg-zinc-800 text-white  flex flex-col items-center pt-4 space-y-4 px-2">
      <h1 className="text-xl font-bold ">History</h1>
    {
      history.length>0 &&history.map((i,key)=>(
      <ul className="flex space-x-4 bg-zinc-900 rounded-md  w-full  px-4 hover:bg-red-950 border border-black cursor-pointer" key={key} onClick={()=>{
        setMethod(i.reqMethod); setRequestBody(i.reqBody); seturl(i.reqUrl)
      }}>
        <li className="uppercase">{i.reqMethod}</li>
          <li className="px-1 overflow-x-hidden ">{i.reqUrl}</li>
      </ul>
      ))
    }
    </div>
     <div className="flex items-center space-y-8 flex-col w-3/4 py-12 justify-center ">
      {/* <React.Fragment>
      <JsonView data={JSON.parse(response)??{"a":"b"}} shouldExpandNode={collapseAllNested} style={darkStyles} />
    </React.Fragment> */}
      {/* <JsonViewer value={JSON.parse(response)??{"a":"b"}}/> */}
        {/* <urlBar method={method} setMethod={setMethod} url={url} seturl={seturl} handleSubmit={handleSubmit}  /> */}
     
        <div className="flex text-white w-3/4 justify-center">
        <div className="px-4 border border-r-0 h-8 flex items-center ">
          <select
            className=" bg-transparent outline-none "
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option className="options-style" value="get">
              GET
            </option>
            <option className="options-style" value="post">
              POST
            </option>
          </select>
        </div>
        <div className="border  h-8 w-full flex items-center">
          <input
            value={url}
            onChange={(e) => seturl(e.target.value)}
            className="px-4 bg-transparent w-full outline-none border-none"
            type="text"
          />
        </div>
        <div>
          <button
            className="px-4 bg-transparent border border-l-0 h-8 hover:bg-zinc-800"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
      
      <div className="w-3/4 flex items-center  flex-col">
        {/* <ul className="flex space-x-4 text-white py-4 ">
          <li className="lists-style">Params</li>
          <li className="lists-style">Authorization</li>
          <li className="lists-style">Headers</li>
          <li className="lists-style">Body </li>
          <li className="lists-style">Scripts </li>
          <li className="lists-style">Settings</li>
        </ul> */}

        <p className="text-white text-center mb-2 ">Headers</p>
        <textarea
          className="w-full p-4 bg-transparent border text-white mb-4"
          onChange={(e) => setHeaders(e.target.value)}
        ></textarea>
        <p className="text-white text-center mb-2 ">Request Body</p>
        <textarea
          className="w-full p-4 bg-transparent border text-white"
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
        ></textarea>
      </div>
      <div className="w-3/4 flex items-center  flex-col h-full">
        <p className="text-white mb-2">Response</p>
        {response?  <div className="border p-2 bg-transparent w-full">
          <JsonViewer style={{backgroundColor:"transparent"}}  theme="dark" value={JSON.parse(response) ?? { a: "b" }} />
        </div>:<textarea
          className="w-full p-4 bg-transparent border text-white "
        ></textarea>}
      </div>
    </div>
   </div>
  );
}
