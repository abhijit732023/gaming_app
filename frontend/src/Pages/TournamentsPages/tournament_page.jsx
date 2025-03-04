import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from './../../FilesPaths/allpath.js';

function TournamentPage() {
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/mainpage'); 
        setData(response.data.room); 
        console.log(response.data.room); 
      } catch (error) {
        setError(error); 
        console.error("Error fetching data:", error); 
      }
    };

    fetchData(); 
  }, []); 

  return (
    <Container className='w-full h-screen bg-gray-900 p-4'>
      <h1 className='text-white text-3xl mb-4'>Tournament Page</h1>
      {error && <p className='text-red-500'>Error fetching data: {error.message}</p>} 
      {data.length > 0 ? (
        data.map((tournament) => (
          <div key={tournament._id} className='bg-gray-800 p-4 mb-4 rounded-lg shadow-lg  sm:h-auto h-[%] scroll-auto'>
            <h2 className='text-white text-2xl'>{tournament.roomType}</h2>
            <p className='text-gray-400'>Tournament ID: {tournament._id}</p>
            <a href={`/tournament/${tournament._id}`} className='text-blue-500'>Join</a>
          </div>
        ))
      ) : (
        <p className='text-white'>Loading...</p> 
      )}
    </Container>
  );
}

export default TournamentPage;