'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 
  const handleregister= ()=>{
      router.push('/register');
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username) {
      setError('Username is required.');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Password is required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://interviewerserver.vercel.app/login', { // Replace with your login API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

     
      const data = await response.json(); 
      if(data.status==202){
      console.log("Login successful:", data);
      localStorage.setItem('username', username) 

      router.push('/dashboard')}
      else{
        console.error("Login error:", data.message);
      setError(data.message);
      }

    } 
    // @ts-expect-ignore
    catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
    //   <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    //     <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

    //     {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

    //     <form onSubmit={handleSubmit}>
    //       <div style={{ marginBottom: '15px' }}>
    //         <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
    //         <input
    //           type="text"
    //           id="username"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
    //         />
    //       </div>
    //       <div style={{ marginBottom: '15px' }}>
    //         <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
    //         />
    //       </div>
    //       <button type="submit" disabled={loading} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' , marginRight: '20px'}}>
    //         {loading ? 'Logging in...' : 'Login'}
    //       </button>
    //       <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleregister} >
    //         Register
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
  <div style={{ backgroundColor: 'black', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}><strong>Login</strong></h2>

    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #555', // Slightly darker border for visibility
            borderRadius: '4px',
            backgroundColor: '#333', // Darker background for input fields
            color: 'white' // White text in input fields
           }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #555',
            borderRadius: '4px',
            backgroundColor: '#333',
            color: 'white'
          }}
        />
      </div>
      <button  disabled={loading} style={{ 
        backgroundColor: 'black', 
        color: 'white',  // White text
        padding: '10px 15px', 
        border: '2px solid white', // White border, 2px thick
        borderRadius: '4px', 
        cursor: 'pointer',
        marginRight: '20px'
       }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

     
      <button style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        padding: '10px 15px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer' 
      }} onClick={handleregister} >
        
        Register
        
       
      </button>
    </form>
  </div>
</div>
  );
};

export default Login;