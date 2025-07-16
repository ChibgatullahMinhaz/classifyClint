import React, { useState } from "react";
import { FaCcStripe, FaPaypal } from "react-icons/fa";

const PaymentPage = () => {
  const [method, setMethod] = useState("stripe");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`btn ${method === "stripe" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setMethod("stripe")}
          >
            <FaCcStripe className="mr-2" /> Stripe
          </button>
          <button
            className={`btn ${method === "paypal" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setMethod("paypal")}
          >
            <FaPaypal className="mr-2" /> PayPal
          </button>
        </div>

        {/* Stripe Payment Form */}
        {method === "stripe" && (
          <form className="space-y-5">
            <div>
              <label className="label">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="label">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="input input-bordered w-full" />
              </div>
              <div className="flex-1">
                <label className="label">CVC</label>
                <input type="text" placeholder="123" className="input input-bordered w-full" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Pay Now
            </button>
          </form>
        )}

        {/* PayPal Placeholder */}
        {method === "paypal" && (
          <div className="text-center text-gray-500 p-10">
            <p className="text-lg">PayPal integration coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
