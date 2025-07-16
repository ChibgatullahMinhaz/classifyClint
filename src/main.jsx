import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/router";
import { RouterProvider } from "react-router";
import AuthProvider from "./Context/Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PUBLISH_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </Elements>
  </StrictMode>
);
