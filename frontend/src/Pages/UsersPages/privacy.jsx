// src/pages/Privacy.js
import React from 'react';
export default function Privacy() {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">We value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our Gaming Tournament platform.</p>
        
        <h2 className="text-xl font-semibold mt-4">1. Information Collection</h2>
        <p className="mb-4">When you register for a tournament, we collect the following personal information:
          <ul className="list-disc ml-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (optional)</li>
            <li>Payment details (processed via Razorpay)</li>
          </ul>
        </p>
  
        <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
        <p className="mb-4">The information we collect is used for the following purposes:
          <ul className="list-disc ml-6">
            <li>To register you for tournaments.</li>
            <li>To process payments through Razorpay.</li>
            <li>To communicate with you about tournament updates, results, and news.</li>
            <li>To improve our platform and user experience.</li>
          </ul>
        </p>
  
        <h2 className="text-xl font-semibold mt-4">3. Payment Processing</h2>
        <p className="mb-4">Payments for tournaments are processed securely via Razorpay. We do not store any payment information on our servers. Razorpay’s privacy policy applies to all payment-related information.</p>
  
        <h2 className="text-xl font-semibold mt-4">4. Data Security</h2>
        <p className="mb-4">We take appropriate security measures to protect your personal data from unauthorized access, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure, so we cannot guarantee absolute security.</p>
  
        <h2 className="text-xl font-semibold mt-4">5. Sharing Your Information</h2>
        <p className="mb-4">We do not share your personal information with third parties, except as necessary for:
          <ul className="list-disc ml-6">
            <li>Processing payments via Razorpay.</li>
            <li>Complying with legal obligations.</li>
          </ul>
        </p>
  
        <h2 className="text-xl font-semibold mt-4">6. Cookies</h2>
        <p className="mb-4">We may use cookies to enhance your experience on our website. Cookies help us understand user preferences and improve the functionality of our platform.</p>
  
        <h2 className="text-xl font-semibold mt-4">7. Your Rights</h2>
        <p className="mb-4">You have the right to:
          <ul className="list-disc ml-6">
            <li>Request access to your personal information.</li>
            <li>Request correction or deletion of your personal information.</li>
            <li>Opt out of receiving marketing communications.</li>
          </ul>
        </p>
  
        <h2 className="text-xl font-semibold mt-4">8. Changes to this Privacy Policy</h2>
        <p className="mb-4">We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. We encourage you to review this policy periodically.</p>
  
        <h2 className="text-xl font-semibold mt-4">9. Contact Us</h2>
        <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@gamingapp.com" className="text-blue-500">support@gamingapp.com</a>.</p>
  
        <p className="mb-4">By using our platform, you consent to the collection and use of your information as described in this policy.</p>
      </div>
    );
  }
  