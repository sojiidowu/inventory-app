import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import React from "react";
import ReactDom from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache data as fresh for 5 minutes
      refetchOnWindowFocus: false, // Prevent refetching every time you tab away
    },
  },
});

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Wrap your application */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
