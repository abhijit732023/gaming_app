import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import BgImage from "../images/money2.webp"; // Background image
import { ENV_File, Header, MobileMenu } from "../../FilesPaths/allpath";

export default function PayNow() {
  const [payment, setPaymentState] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown state
  const { team_id, id, amount, userid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ team_id, id, amount, userid });
  }, [team_id, id, amount, userid]);

  useEffect(() => {
    if (payment) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setTimeout(() => {
              navigate(`/mytournament/${userid}`);
            }, 0);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [payment, navigate, userid]);

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${ENV_File.backendURL}/payment/request`, {
        amount: amount,
      });

      const orderData = response.data;

      const options = {
        key: `${ENV_File.razor_key_id}`,
        amount: orderData.amount,
        currency: "INR",
        name: "Tournament Entry",
        description: `Pay ₹${amount} to join the tournament`,
        order_id: orderData.id,
        handler: async function (response) {
          console.log("Payment Response:", response);
          try {
            await axios.post(`${ENV_File.backendURL}/payment/verify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              teamId: team_id,
            });
            setPaymentState(true);
          } catch (error) {
            console.error("Verification error:", error.response?.data || error.message);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${BgImage}?v=1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Header for Desktop and MobileMenu for Mobile */}
      <div className="relative z-40 w-full">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Mobile Menu */}
        <div className="block md:hidden">
          <MobileMenu />
        </div>
      </div>

      {/* Payment Section */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 py-8">
        <div className="backdrop-blur-2xl bg-grey/40 text-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
          <div className="text-blue-600 text-4xl mb-4 flex justify-center">
            <FaMoneyCheckAlt />
          </div>
          <h2 className="text-2xl font-bold mb-2">Tournament Payment</h2>
          <p className="mb-6 text-gray-300">
            Complete your payment to confirm your team’s entry into the tournament.
          </p>

          <div className="text-left mb-4 text-sm text-white font-extralight space-y-1">
            <p><strong>Team ID :</strong> {team_id}</p>
            <p><strong>Tournament ID :</strong> {id}</p>
            <p><strong>Amount :</strong> ₹{amount}</p>
          </div>

          {payment ? (
            <>
              <p className="text-green-600 font-semibold text-lg mb-4">
                ✅ Payment successful! See you in the arena. 🎮
              </p>
              <p className="text-yellow-400 text-sm">
                Redirecting to the tournament page in {countdown} seconds...
              </p>
            </>
          ) : (
            <button
              onClick={handlePayment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Pay ₹{amount} Now
            </button>
          )}

          <p className="text-xs text-gray-400 mt-4">
            You’ll be redirected to Razorpay to complete your payment securely.
          </p>

          {/* Back Link */}
          <button
            onClick={() => navigate(-1)}
            className="mt-6 text-blue-400 hover:underline"
          >
            ← Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}
