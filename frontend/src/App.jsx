import io from "socket.io-client";
import { useEffect, useState } from "react";
import imgReact from "/react-logo.png";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [validation, SetValidation] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    const newMessage = {
      body: message,
      from: name,
      by: ""
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", { body: message, name: name, from: "Me" });   
    setMessage("");
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
    <div className={`absolute z-10 h-screen w-screen bg-black opacity-60 ${validation ===  true ? 'hidden' : ''}`}></div>
    <form onSubmit={handleSubmit} className={`absolute bg-zinc-800 text-white flex  items-center justify-center gap-5 p-10 flex-col z-20 ${validation ===  true ? 'hidden' : ''}`}>
      <h1>Ingrese su nombre</h1>
      <input className="text-black" type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={() => SetValidation(true)} className="border p-2">Ingresar</button>  
    </form>  
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 w-80 overflow-auto container"
      >
        <div className="top">
          <div className="Cline">
            <div className="line"></div>
          </div>
          <div className="flex gap-2 border-b-2 items-center p-3">
            <img className="img-chat" src={imgReact} alt="" />
            <h1 className="text-2xl font-bold my-2">Chat React Group</h1>
          </div>
        </div>
        <div className="chat">
          <ul className="p-2 subchat">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`mensaje z-0 my-2 p-2 table rounded-md ${
                  message.from === "Me" ? "bg-gray-700" : "bg-sky-700 ml-auto"
                }`}
              >
                <span className="text-xs text-slate-50 block">
                  {message.by === "Me" ?  "Me" : message.name}
                </span>
                <span className="text-sm">
                  {message.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <input
          className="border-0 border-zinc-500 p-2 w-full text-black sticky bottom-0 "
          type="text"
          placeholder="Write your  message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
