'use client'
import { useState } from 'react';
import useLLM from 'usellm'


export default function Home() {

  const [result,setResult]=useState('')
  const [input,setInput]=useState('')


  const llm = useLLM({
    serviceUrl:'https://usellm.org/api/llm'
  })

  async function handleClick() {
    try {
      await llm.chat({
        messages: [
        
          { role: "user", content:`${input}` },
        ],
        stream: true,
        onStream: ({ message }) =>setResult(message.content)

      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }




  return (

<section className="flex justify-center items-center h-screen ">


<div className="max-w-xl w-full  " >

<textarea onChange={(e)=>setInput(e.target.value)} placeholder='Escribe...' className="text-black bg-slate-0
  px-3 py-2 w-full rounded-md focus:outline-none" rows={4}></textarea>



<button
  className="bg-blue-600 text-white px-3 py-2 rounded-md focus:outline-none disabled:opacity-50"
  onClick={handleClick}
>
  Enviar
</button>   

<div style={{whiteSpace:'pre-wrap'}}>{result}</div>
 </div>

</section>



  )
}
