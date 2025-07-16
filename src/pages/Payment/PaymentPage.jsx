import React, { useState } from "react";
import { FaCcStripe, FaPaypal } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";
import axiosSecure from "../../Service/AxiosSecure";
import { useQuery } from "@tanstack/react-query";

const fetchClassInfo = async (id) => {
  const res = await axiosSecure.get(`/api/classDetails/${id}`);
  return res.data;
};
const PaymentPage = () => {
  const { id } = useParams();
  const [method, setMethod] = useState("stripe");

  const {
    data: classData,
  } = useQuery({
    queryKey: ["class-details", id],
    queryFn: () => fetchClassInfo(id),
  });
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Payment
        </h2>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`btn ${
              method === "stripe" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setMethod("stripe")}
          >
            <FaCcStripe className="mr-2" /> Stripe
          </button>
          <button
            className={`btn ${
              method === "paypal" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setMethod("paypal")}
          >
            <FaPaypal className="mr-2" /> PayPal
          </button>
        </div>

        {/* Stripe Payment */}
        {method === "stripe" && <CheckoutForm classData={classData} amount={5000} classId="1234" />}

        {/* PayPal Visual Placeholder */}
        {method === "paypal" && (
          <div className="text-center px-6 py-12 border rounded-xl shadow-inner bg-gray-50">
            <img
              src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
              alt="PayPal Logo"
              className="mx-auto mb-4 w-20"
            />
            <p className="text-gray-700 text-lg font-medium">
              PayPal integration coming soon!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We are working on enabling PayPal payments. Please use Stripe for
              now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
