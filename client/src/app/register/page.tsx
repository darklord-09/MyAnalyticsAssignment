'use client'; 
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); 
  const router= useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError('');  // Clear any previous errors
    setSuccess(''); // Clear any previous success messages
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
        const response = await fetch('http://localhost:3000/register', { // Replace with your API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, password: password }),
        });
  
        if (!response.ok) {
          const errorData = await response.json(); // Try to parse error response
          throw new Error(errorData.message || 'Registration failed'); // Use error message from backend or default
        }
  
        setSuccess('Registration successful!');
        setUsername('');
        setPassword('');
        router.push('/login');
  
      } catch (err: any) { // Catch potential errors during fetch
        console.error("Registration error:", err);
        setError(err.message); // Set the error message to display
      } finally {
        setLoading(false);  // Reset loading state in finally block to ensure it's always reset
      }



  };

  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
    //   <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    //     <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>

    //     {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
    //     {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

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
    //       <button type="submit" disabled={loading} style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
    //         {loading ? 'Registering...' : 'Register'} 
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
  <div style={{ backgroundColor: 'black', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white', fontWeight: 'bold' }}>Register</h2>

    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
    {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

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
            border: '1px solid #555',
            borderRadius: '4px',
            backgroundColor: '#333',
            color: 'white'
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
        color: 'white',
        padding: '10px 15px',
        border: '2px solid white', // White border
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  </div>
</div>
  );
};

export default Register;