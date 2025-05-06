// src/pages/Terms.js
import React from 'react';
export default function Terms() {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-4">Welcome to our Gaming Tournament platform. By registering and participating in any tournament hosted on our platform, you agree to the following terms and conditions:</p>
        
        <h2 className="text-xl font-semibold mt-4">1. Registration and Participation</h2>
        <p className="mb-4">To participate in any tournament, you must register on our website and provide accurate details. Participation is subject to availability and compliance with tournament rules.</p>
  
        <h2 className="text-xl font-semibold mt-4">2. Tournament Rules</h2>
        <p className="mb-4">Each tournament may have its own specific rules. It is your responsibility to familiarize yourself with these rules before entering. Failure to comply with the rules can result in disqualification.</p>
  
        <h2 className="text-xl font-semibold mt-4">3. Code of Conduct</h2>
        <p className="mb-4">Participants must conduct themselves in a respectful and fair manner. Any form of cheating, harassment, or misconduct will lead to disqualification without refund.</p>
  
        <h2 className="text-xl font-semibold mt-4">4. Payment and Fees</h2>
        <p className="mb-4">Tournament entry fees, if applicable, must be paid in full. All payments are handled via Razorpay, and the platform does not store payment information.</p>
  
        <h2 className="text-xl font-semibold mt-4">5. No Refunds</h2>
        <p className="mb-4">Once payment for tournament registration is made, no refunds will be issued unless the event is canceled by the organizers.</p>
  
        <h2 className="text-xl font-semibold mt-4">6. Liability</h2>
        <p className="mb-4">We are not liable for any losses, damages, or injuries incurred during participation in the tournament. By registering, you assume full responsibility for your actions during the event.</p>
  
        <h2 className="text-xl font-semibold mt-4">7. Modifications</h2>
        <p className="mb-4">We reserve the right to modify the tournament format, rules, or structure at any time. Participants will be notified of any significant changes.</p>
  
        <h2 className="text-xl font-semibold mt-4">8. Governing Law</h2>
        <p className="mb-4">These terms are governed by the laws of India. Any disputes will be handled in the jurisdiction of the Indian courts.</p>
        
        <p className="mb-4">By participating in our tournaments, you agree to these terms and conditions. If you have any questions, feel free to reach out to us through our <a href="/contact" className="text-blue-500">Contact Page</a>.</p>
      </div>
    );
  }
  