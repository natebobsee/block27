import { useState } from 'react'
import './App.css'
//import Authenticate from "./Authenticate.jsx";
//import SignUpForm from "./SignUpForm.jsx";


function App() {
const [token, setToken] = useState('');
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);
const [Message, setMessage] = useState(null);
async function handleClick (evt) {
    evt.preventDefault();
    const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', 
    { 
      method: "GET", 
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });
    
    const json = await response.json();

    if(!json.success) {
      setError(json.message);
      return;
    }
     console.log(json.message);
    setMessage(json.message);
    setError('');
  }

async function handleSubmit(event) {
  event.preventDefault();
  console.log("Hello ");
  try {
    const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json" 
      }, 
      body: JSON.stringify({ 
        username: "${username}", 
        password: "${password}" 
      }) 
    });
    const result = await response.json();
    console.log(result.token);
    setToken(result.token)
  } catch (error) {
    
    setError(error.message);
  }
}

  return (
    <>
  <form onSubmit={handleSubmit}>
  <label>
    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
  </label>
  <div>
  <label>
    Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
  </label>
  </div>
  <div>
  <button>Submit</button>
 </div>
</form>
<button onClick={handleClick}>Authenticate Token!</button>
   {Message}
    </>
  )
}

export default App
