import { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, checkNumber] = useState(false);
  const [isCharacter, checkCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) {
      str += "0123456789";
    }
    if (isCharacter) {
      str += "~!@#$%^&*()_-+={[}]/<>";
    }
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumber, isCharacter, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, isNumber, isCharacter, passwordGenerator]);
  return (
    <>
      <h1 className="text-center py-8 my-4 text-4xl text-white">
        Password Generator
      </h1>
      <div className="p-4 white shadow-lg rounded-lg flex flex-wrap flex-col ">
        <div className="flex flex-wrap justify-center w-full">
          <input
            type="text"
            value={password}
            className="outline-none rounded-l-sm p-2"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-500 text-white rounded-r-sm p-4"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-wrap text-white justify-start my-4  p-3 gap-2 items-center flex-col">
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className=""
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-slate-500">Length : {length}</label>
          </div>
          <div className="flex flex-wrap gap-3 text-slate-500">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              onChange={() => {
                checkNumber((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex flex-wrap gap-2 text-slate-500">
            <input
              type="checkbox"
              defaultChecked={isCharacter}
              onChange={() => {
                checkCharacter((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
