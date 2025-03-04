import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TournamentDetail() {
  const { id } = useParams(); // Access the dynamic route parameter
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(`http://localhost:3000/mainpage/${id}`);
        if (!response.ok) {
          throw new Error('Tournament not found');
        }
        const data = await response.json();
        setTournament(data.room); // Ensure this matches your API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-screen flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className='w-full min-h-screen bg-gray-900 p-6 text-white'>
      <h1 className='text-4xl font-bold mb-4'>{tournament?.roomType || "Tournament Details"}</h1>
      <p className='text-lg mb-2'><strong>ID:</strong> {tournament?._id}</p>
      <p className='text-lg mb-2'><strong>Room ID:</strong> {tournament?.roomId}</p>
      <p className='text-lg mb-2'><strong>Date and Time:</strong> {new Date(tournament?.dateTime).toLocaleString()}</p>
      <p className='text-lg mb-2'><strong>Entry Fee:</strong> {tournament?.entryFee}</p>
      <p className='text-lg mb-2'><strong>Price:</strong> {tournament?.price}</p>
      <p className='text-lg mb-2'><strong>Slot:</strong> {tournament?.slot}</p>
      <div className='flex flex-wrap gap-2 mb-4'>
        {Array.from({ length: tournament?.slot }).map((_, index) => (
          <a key={index}  href={`${id}/slot/${index+1}`}>
            <div className='h-10 w-10 bg-amber-100 text-black flex items-center justify-center'>
              {index + 1}
            </div>
          </a>

        ))}
      </div>
      <p className='text-lg mb-2'><strong>Description:</strong> {tournament?.description}</p>
      <p className='text-lg mb-2'><strong>Created At:</strong> {new Date(tournament?.createdAt).toLocaleString()}</p>
      <p className='text-lg mb-2'><strong>Updated At:</strong> {new Date(tournament?.updatedAt).toLocaleString()}</p>
    </div>
  );
}

export default TournamentDetail;