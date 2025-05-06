// src/pages/Support.js
import React,{ useState } from 'react';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('Sending...');

    try {
      // Here you would send the form data to your backend or API endpoint
      // For example, you can use Axios or fetch API for this.
      // await axios.post('/api/support', formData);

      setStatus('Support request sent successfully!');
      setFormData({
        name: '',
        email: '',
        issue: '',
      });
    } catch (error) {
      setStatus('Failed to send request. Please try again later.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="mb-4">
        If you're experiencing issues or need assistance with our tournaments, please fill out the form below, and our support team will get back to you as soon as possible.
      </p>

      {/* Support Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-lg font-semibold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold" htmlFor="issue">
            Issue Description
          </label>
          <textarea
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md"
          >
            Submit Support Request
          </button>
        </div>
      </form>

      {status && <p className="mt-4 text-center text-lg">{status}</p>}

      {/* Frequently Asked Questions (FAQs) */}
      <h2 className="text-xl font-semibold mt-8">Frequently Asked Questions (FAQs)</h2>
      <div className="mt-4 space-y-4">
        <div>
          <h3 className="font-semibold">Q1: How do I register for a tournament?</h3>
          <p>To register for a tournament, simply go to the tournament registration page, fill out the required details, and make your payment. Once done, you’ll receive a confirmation email.</p>
        </div>

        <div>
          <h3 className="font-semibold">Q2: How do I update my registration details?</h3>
          <p>If you need to update your registration details, please contact our support team via the form above, and we’ll assist you with the changes.</p>
        </div>

        <div>
          <h3 className="font-semibold">Q3: What happens if I miss the tournament?</h3>
          <p>If you miss a tournament that you’ve registered for, unfortunately, no refund or rescheduling is allowed. Please make sure to attend the tournament on the scheduled date and time.</p>
        </div>

        <div>
          <h3 className="font-semibold">Q4: How can I contact support?</h3>
          <p>You can contact our support team by submitting the form above, or you can reach us directly at <a href="mailto:support@gamingapp.com" className="text-blue-500">support@gamingapp.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
