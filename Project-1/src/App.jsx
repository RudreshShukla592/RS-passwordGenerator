import { useCallback, useEffect, useRef } from "react";
import { useState } from "react"


const App = () => {
  const [length, setLength] = useState(8);
  const [numBar, setNumBar] = useState(false);
  const [charBar, setCharBar] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null)

  const passwordGenerator= useCallback(()=>{
    let pass = ""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzmxncbv"

    if(numBar) str+="1234567890"
    if(charBar) str+="!@#$%^&*(){}[],.<>"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char);
    }

    setPassword(pass)

  },[length,numBar,charBar])

  const copyPassword = useCallback(()=>{
    passRef.current?.select()

    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numBar,charBar,passwordGenerator])

  return (
    <>
      <h1 className='text-4xl px-10 py-10'>Password generator</h1>
      <div className="w-full text-center mx-5 max-w-md shadow-md rounded-lg p-6 my-8 text-orange-700 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" placeholder="password" value={password} ref={passRef} readOnly className="w-full py-1 px-2 outline-none bg-white"/>
          <button className="bg-yellow-200 px-1 hover:bg-pink-300 hover:text-red-900" onClick={copyPassword} >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
            
            <input 
           type="range"
            min={6}
            max={100}
            value={length}
             className='cursor-pointer'
             onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
        </div> 
        <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numBar}
          id="numberInput"
          onChange={() => {
              setNumBar((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
       <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charBar}
              id="characterInput"
              onChange={() => {
                  setCharBar((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
    </>
  )
}

export default App