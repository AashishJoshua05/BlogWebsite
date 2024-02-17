import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext);

    async function login(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'Post',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }
        else{
            alert("Wrong Username/Password")
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

  return (
    <div className='flex flex-col justify-items-center mt-16 space-y-8'>
        <h1 className='flex justify-center text-4xl font-bold'>Login</h1>
        <form className=' flex flex-col space-y-8' onSubmit={login}>
            <input type='text' placeholder='UserName' className='p-4 rounded-md hover:border-gray-700 border-transparent border-2' 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input type="password" placeholder='Password' className='p-4 rounded-lg hover:border-gray-700 border-transparent border-2'
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
            <button className='p-4 bg-gray-700 hover:bg-gray-900 text-white'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage