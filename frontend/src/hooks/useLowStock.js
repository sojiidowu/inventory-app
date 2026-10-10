import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

import React from "react";

const useLowStock = () => {
  return useQuery({
    queryKey: ["low-stock"],
    queryFn: async () => {
      const res = await api.get("products/low_stock/");
      console.log(res.data);
      return res.data;
    },
  });
};

export default useLowStock;
