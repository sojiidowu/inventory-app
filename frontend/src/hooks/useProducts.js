import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

import React from "react";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("products/");
      console.log(res.data);
      return res.data; // Returns { count: X, results: [...] }
    },
  });
};

export default useProducts;
