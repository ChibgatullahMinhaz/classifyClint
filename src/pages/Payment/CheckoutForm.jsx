import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axiosSecure from "../../Service/AxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      letterSpacing: "0.025em",
      fontFamily: "Segoe UI, sans-serif",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const CheckoutForm = ({ classData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  console.log(classData);
  const paybaleAmount = parseFloat(classData?.price);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const cardNumber = elements.getElement(CardNumberElement);
    try {
      // Step 1: Create Payment Intent
      const amount = parseFloat(classData?.price) * 100;

      const res = await axiosSecure.post("/api/create-checkout-session", {
        amount,
        currency: "usd",
      });

      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm Card Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: user?.displayName || "Guest",
            email: user?.email || "unknown@example.com",
          },
        },
      });

      if (result.error) {
        console.error("❌ Payment Error:", result);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
      } else if (result.paymentIntent.status === "succeeded") {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Thank you! Your booking has been confirmed.",
        });
        console.log(result);

        // Step 3: Save Booking Info to Backend
        // make payment history
        const bookingHistory = {
          email: user?.email,
          name: user?.displayName || "Guest",
          paymentIntentId: result.paymentIntent.id,
          amount: result.paymentIntent.amount / 100, // convert cents to dollars
          currency: result.paymentIntent.currency,
          status: result.paymentIntent.status,
          paymentMethodId: result.paymentIntent.payment_method,
          userEmail: user?.email,
          classId: classData?._id,
          date: new Date(result.paymentIntent.created * 1000), // convert UNIX timestamp
        };

        const enrollmentInfo = {
          userId: user?.uid,
          userEmail: user?.email,
          userName: user?.displayName,
          classId: classData?._id,
          classTitle: classData?.title,
          instructor: classData?.name,
          paymentIntentId: result.paymentIntent.id,
          paymentMethodId: result.paymentIntent.payment_method,
          amountPaid: result.paymentIntent.amount / 100,
          currency: result.paymentIntent.currency,
          paymentStatus: "Paid",
          paymentDate: new Date(result.paymentIntent.created * 1000),
          enrollmentStatus: "enrolled",
          enrollmentDate: new Date(),
          discountCode: "",
          enrollmentSource: "web",
        };
        
        const enrollmentData = {
          bookingHistory,
          enrollmentInfo,
        };
        const response = await axiosSecure.post(
          "/api/enrollments",
          enrollmentData
        );
        console.log("📦 Booking saved:", response.data);
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Thank you! Your booking has been confirmed.",
        });

        onSuccess?.(); // callback if provided
      }
    } catch (err) {
      console.error("❌ Server error:", err.message);
      console.error("❌ Server error:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: err.message,
      });
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-md shadow"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payment Details
      </h2>

      {/* Card Number */}

      <div>
        <label className="text-sm font-medium text-gray-600">Card number</label>
        <div className="border rounded-md px-4 py-3">
          <CardNumberElement options={ELEMENT_OPTIONS} />
        </div>
        <div className="flex justify-end mt-1 space-x-1">
          <img src="https://img.icons8.com/color/24/visa.png" alt="visa" />
          <img
            src="https://img.icons8.com/color/24/mastercard-logo.png"
            alt="mastercard"
          />
          <img src="https://img.icons8.com/color/24/amex.png" alt="amex" />
          <img
            src="https://img.icons8.com/color/24/discover.png"
            alt="discover"
          />
        </div>
      </div>

      {/* Expiry & CVC */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-600">Expiry</label>
          <div className="border rounded px-4 py-3 bg-gray-50">
            <CardExpiryElement options={ELEMENT_OPTIONS} />
          </div>
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-600">CVC</label>
          <div className="border rounded px-4 py-3 bg-gray-50">
            <CardCvcElement options={ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
      >
        {isLoading ? "Processing..." : `Pay $${paybaleAmount}`}
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        Your payment is secure and encrypted by Stripe.
      </p>
    </form>
  );
};

export default CheckoutForm;
