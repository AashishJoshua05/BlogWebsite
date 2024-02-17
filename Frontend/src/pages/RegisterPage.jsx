import React, { useState } from 'react'

function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function register(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/register', {
            method: 'Post',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'}
        })
        console.log(response)
        if (response.status === 200) {
            alert("Registered Succesfully")
        } else {
            alert("Registration Failed")
        }

    }

  return (
    <div className='flex flex-col justify-items-center mt-16 space-y-8'>
        <h1 className='flex justify-center text-4xl font-bold'>Register</h1>
        <form className=' flex flex-col space-y-8' onSubmit={register}>
            <input type='text' placeholder='UserName' className='p-4 rounded-md hover:border-gray-700 border-transparent border-2' 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input type="password" placeholder='Password' className='p-4 rounded-lg hover:border-gray-700 border-transparent border-2'
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
            <input type="password" placeholder='Confirm Password' className='p-4 rounded-lg hover:border-gray-700 border-transparent border-2'
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
            />
            <button className='p-4 bg-gray-700 hover:bg-gray-900 text-white'>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage