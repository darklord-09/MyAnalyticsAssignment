'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  type CandidateType = {
    _id: number | string;
    candidate: string;
    interviewDate: string;
    interviewTime: string;
    status: boolean; 
  };
  
  const router = useRouter();
  const [candidateData, setCandidateData] = useState<CandidateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCandidate, setEditingCandidate] = useState<CandidateType | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<CandidateType>>({});
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');



if (!storedUsername) {

router.push('/login');

return; // Important: Stop further execution if no username

}


async function fetcher () {



try {

const response = await fetch('https://interviewerserver.vercel.app/loader', { // Replace with your login API endpoint

method: 'POST',

headers: {

'Content-Type': 'application/json',

},

body: JSON.stringify({ username: storedUsername}),

});



if (!response.ok) {

const errorData = await response.json();

throw new Error(errorData.message || 'Login failed');

}




const data = await response.json();

if(data.status==202){

console.log(data);

setCandidateData(data.message);

setLoading(false)

}

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

}

fetcher()
  }, [router]);

  


  const handleEdit = (candidate: CandidateType) => {
    setEditingCandidate(candidate);
    setUpdatedData({ ...candidate }); // Initialize updatedData with current values
  };

  // @ts-expect-ignore
  const handleInputChange = (field: keyof CandidateType, value: any) => {
    console.log(field);
    console.log(value);
    setUpdatedData({ ...updatedData, [field]: value });
  };

  const handleUpdate = async () => {
    if (!editingCandidate) return;

    try {
      
      const response = await fetch(`https://interviewerserver.vercel.app/update`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id : `${editingCandidate._id}`, data :updatedData}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }

      
      const updatedCandidateIndex = candidateData.findIndex(c => c._id === editingCandidate._id);
      if (updatedCandidateIndex !== -1) {
        const updatedCandidates = [...candidateData];
        updatedCandidates[updatedCandidateIndex] = { ...editingCandidate, ...updatedData };
        setCandidateData(updatedCandidates);
      }

      setEditingCandidate(null);// Close edit mode
      setUpdatedData({});       // Clear the updated data
      alert("Updated Successfully")
    } 
    // @ts-expect-ignore
    catch (error: any) {
      console.error("Update error:", error);
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingCandidate(null);
    setUpdatedData({});
  };


  const [isCreating, setIsCreating] = useState(false);
  const [newCandidate, setNewCandidate] = useState<Omit<CandidateType, '_id'>>({  // Omit _id for new entry
    candidate: '',
    interviewDate: '',
    interviewTime: '',
    status: false, // Default status for new candidates
  });

  const handleCreate = () => {
    setIsCreating(true);
    setNewCandidate({
      candidate: '',
      interviewDate: '',
      interviewTime: '',
      status: false,
    }); // Clear the form
  };
 // @ts-expect-ignore
  const handleCreateInputChange = (field: keyof Omit<CandidateType, '_id'>, value: any) => {
    setNewCandidate({ ...newCandidate, [field]: value });
  };

  const handleSaveNewCandidate = async () => {
    try {
      const response = await fetch('https://interviewerserver.vercel.app/schedule', { // Your create API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: localStorage.getItem('username'),candidate:newCandidate.candidate,interviewDate : newCandidate.interviewDate,interviewTime : newCandidate.interviewTime,status : false}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Create failed');
      }

      // Refresh the data after successful creation
      window.location.reload();
      setIsCreating(false); // Close the create form
      setNewCandidate({
        candidate: '',
        interviewDate: '',
        interviewTime: '',
        status: false,
      }); // Clear the form
      alert("Created Successfully")
    } 
    //@ts-expect-ignore
    catch (error: any) {
      console.error("Create error:", error);
      setError(error.message);
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handleDelete = async (candidate: CandidateType) => {
    if (confirm("Are you sure you want to delete this candidate?")) {
      try {
        const response = await fetch(`https://interviewerserver.vercel.app/delete`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: candidate._id }), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Delete failed');
        }

        
        setCandidateData(candidateData.filter(c => c._id !== candidate._id));
        
        window.location.reload();
      } 
      // @ts-expect-ignore
      catch (error: any) {
        console.error("Delete error:", error);
        setError(error.message);
      }
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'done'

  const filteredCandidates = candidateData.filter(candidate => {
    const searchMatch = candidate.candidate.toLowerCase().includes(searchQuery.toLowerCase());
    let statusMatch = true;

    if (filterStatus !== 'all') {
      const status = candidate.status ? 'pending' : 'done'; // Convert boolean to string for comparison
      statusMatch = status === filterStatus;
    }

    return searchMatch && statusMatch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const handleLogout=()=>{
    localStorage.removeItem('username');
    router.push('/login');

  }



  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Error: {error}</div>;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
       <nav className="bg-black p-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">

            <div className="flex items-center">
                <img src="././favicon.ico" alt="Your Logo" className="h-8 mr-3"/>  <span className="self-center text-xl font-semibold text-white">Interview Scheduler</span>
            </div>

            <div>
                <button className="bg-transparent hover:bg-white text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded" onClick={handleLogout}>
                    Logout
                </button>
            </div>

        </div>
    </nav>
     
      {candidateData.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No data found for this user.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>Candidate Name</th>
              <th style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>Interview Date</th>
              <th style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>Time</th>
              <th style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>Status</th>
                <th style={{padding: '10px',
    borderBottom: '1px solid #ccc',
    display: 'flex', // Use flexbox directly on the <th>
    alignItems: 'center',
    gap: '10px',
    width: '100%'}}>
                  <input
                    type="text"
                    placeholder="Search Candidate"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc' }}
                  />

                  <select value={filterStatus} onChange={handleFilterChange} style={{ padding: '5px', border: '1px solid #ccc' }}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                  </select>
                </th>
            
            </tr>
          </thead>
        
          <tbody>
          {filteredCandidates.map((candidate) => (
              <tr key={candidate._id} style={tableRowStyle}>
                <td style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>{candidate.candidate}</td>
                <td style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>
                  {editingCandidate?._id === candidate._id ? (
                    <input
                      type="date"
                      value={updatedData.interviewDate || candidate.interviewDate.slice(0,10)}
                      onChange={(e) => handleInputChange('interviewDate', e.target.value)}
                    />
                  ) : (
                    candidate.interviewDate.slice(0,10)
                  )}
                </td>
                <td style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>
                  {editingCandidate?._id === candidate._id ? (
                    <input
                      type="time"
                      value={updatedData.interviewTime || candidate.interviewTime}
                      onChange={(e) => handleInputChange('interviewTime', e.target.value)}
                    />
                  ) : (
                    candidate.interviewTime
                  )}
                </td>
                <td style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>
                  {editingCandidate?._id === candidate._id ? (
                    <select
                      value={updatedData.status !== undefined ? (updatedData.status?1:0) : (candidate.status?1:0)}
                      onChange={(e) => handleInputChange('status', (e.target.value?true:false))} // Convert to boolean
                    >
                      <option value={1}>Pending</option>
                      <option value={0}>Done</option>
                    </select>
                  ) : (
                    candidate.status ? "Done" : "Pending"
                  )}
                </td>
                <td style={{border :'1 px solid #ccc',padding: '10px',textAlign: 'left'}}>
                  {editingCandidate?._id === candidate._id ? (
                    <>
                      <button onClick={handleUpdate} style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        padding: '10px 15px', 
        border: 'none', 
        borderRadius: '4px', 
        marginRight: '10px',
        cursor: 'pointer' 
      }}>Update</button>
                      <button onClick={handleCancelEdit} style={{ 
        backgroundColor: 'black', 
        color: 'red', 
        padding: '10px 15px', 
        border: 'none', 
        borderRadius: '4px', 
        marginRight: '10px',
        cursor: 'pointer' 
      }}>Cancel</button>
                    </>
                  ) : (
                    <>
                    <button onClick={() => handleEdit(candidate)} style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        padding: '10px 15px', 
        border: 'none', 
        borderRadius: '4px', 
        marginRight: '10px',
        cursor: 'pointer' 
      }} >Edit</button>

      
                    <button onClick={() => handleDelete(candidate)} style={{ 
        backgroundColor: 'black', 
        color: 'red', 
        padding: '10px 15px', 
        border: 'none', 
        borderRadius: '4px', 
       
        cursor: 'pointer' 
      } }>Delete</button> 
                    </>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

<div style={{ backgroundColor: '#eee', padding: '20px',borderRadius: '8px', display: 'flex',  flexDirection: 'column'
}}>
 <center> 
<h2 style={{color : "black"}}><strong><center>Create New Candidate</center></strong></h2>
      {isCreating ? (
        <div>
          <input
            type="text"
            placeholder="Candidate Name"
            value={newCandidate.candidate}
            onChange={(e) => handleCreateInputChange('candidate', e.target.value)}
            style={inputStyle}
          />
          <input
            type="date"
            value={newCandidate.interviewDate}
            onChange={(e) => handleCreateInputChange('interviewDate', e.target.value)}
            style={inputStyle}
          />
          <input
            type="time"
            value={newCandidate.interviewTime}
            onChange={(e) => handleCreateInputChange('interviewTime', e.target.value)}
            style={inputStyle}
          />
          
          <button onClick={handleSaveNewCandidate} style={buttonStyle}>Save</button>
          <button onClick={handleCancelCreate} style={buttonStyle}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleCreate} style={{ 
          backgroundColor: 'black', 
          color: 'white', 
          padding: '10px 15px', 
          border: 'none', 
          borderRadius: '4px', 
          marginRight: '10px',
          cursor: 'pointer' 
        }}>Add Candidate</button>
      )}
</center>
      </div>
    </div>
  );
  
};

 

const tableRowStyle = {
  backgroundColor: '#fff',
};



const inputStyle = {
  backgroundColor: '#333',
  color: 'white', 
  border: '1px solid white', 
  padding: '7px',
  margin: '10px 10px 10px 10px', 
  flex :1,
  borderRadius: '4px', 
};


const buttonStyle = {
  backgroundColor: 'black', 
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  margin: '5px',
  flex :1,
  borderRadius: '4px',
  cursor: 'pointer',
};


export default Dashboard;