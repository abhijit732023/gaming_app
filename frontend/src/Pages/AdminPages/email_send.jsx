import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BGimage from '../images/spider.jpg'; // Background image

function Email_sendPage() {
  const { tournamentid } = useParams();

  // State variables
  const [teams, setTeams] = useState([]); // Store fetched teams
  const [email, setEmail] = useState([]); // Store email addresses
  const [roomid, setRoomId] = useState(''); // Room ID input
  const [password, setPassword] = useState(''); // Room Password input

  // Predefined subject and message
  const subject = "Your Tournament Room Details 🎮";
  const message = `
    Hello Gamer,

    Here are your room details for the upcoming match:

    🏷️ Room ID: <strong>${roomid}</strong>
    🔑 Room Password: <strong>${password}</strong>

    Please join the room 10 minutes before the match start time.
    Good luck and have fun!

    - Team Gaming App
  `;

  // Fetch teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://192.168.0.106:3000/team/teamss/${tournamentid}`);
        setTeams(response.data.teams); // Store fetched teams
      } catch (error) {
        console.error('Error fetching teams:', error);
        alert('Failed to fetch teams.');
      }
    };

    fetchTeams();
  }, [tournamentid]);

  // Extract leader emails after teams are updated
  useEffect(() => {
    if (teams.length > 0) {
      const leaderEmails = teams.map((team) => team.leader.email); // Extract leader emails
      setEmail(leaderEmails); // Update email state
    }
  }, [teams]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.0.106:3000/email', { subject, message, email });
      alert('Emails sent successfully!');
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${BGimage})`, // Background image
      }}
    >
      {/* Black overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <Link
        to={-1}
        className="text-white z-60 absolute top-4 left-4 font-semibold hover:underline"
      >
        back
      </Link>
      {/* Main container */}
      <div className="backdrop-blur-sm bg-black/20 border-2 border-amber-400/30 p-8 rounded-lg w-full max-w-6xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}

        <div>
          <h1 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">
            Send Tournament Room Details
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Room ID Input */}
            <div className="mb-4">
              <label htmlFor="roomid" className="block text-sm font-medium mb-1 text-yellow-300">
                Room ID:
              </label>
              <input
                type="text"
                id="roomid"
                value={roomid}
                onChange={(e) => setRoomId(e.target.value)}
                className="border p-3 w-full rounded-lg text-white bg-black/20"
                placeholder="Enter Room ID"
                required
              />
            </div>

            {/* Room Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-yellow-300">
                Room Password:
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-3 w-full rounded-lg text-white bg-black/20"
                placeholder="Enter Room Password"
                required
              />
            </div>

            {/* Subject and Message Preview */}
            <div>
              <strong className="text-yellow-300">Subject:</strong> {subject}
            </div>
            <div className="my-2">
              <strong className="text-yellow-300">Message:</strong>
              <div className="mt-2 bg-black/30 p-4 rounded-md text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: message }} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-black py-3 px-6 rounded-lg hover:bg-yellow-600 transition"
              >
                Send Emails
              </button>
            </div>
          </form>
        </div>

        {/* Teams Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Registered Teams:</h2>
          <div className="space-y-4 backdrop-blur-3xl bg-black/20 p-4 rounded-md shadow-md max-h-124 overflow-y-auto">
            {teams.length > 0 ? (
              <ul className="space-y-4">
                {teams.map((team, index) => (
                  <li
                    key={index}
                    className="bg-black/30 border-2 border-amber-300/30 mb-2  text-white p-4 rounded-md shadow-md"
                  >
                    <div className=''>
                      <strong className='text-yellow-500'>Team Name:</strong> {team.teamName}
                      <br />
                      <strong className='text-yellow-500'>Leader:</strong> {team.leader.name} ({team.leader.email})
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No teams registered yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Email_sendPage;