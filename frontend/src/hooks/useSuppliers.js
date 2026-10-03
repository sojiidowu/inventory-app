import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

import React from "react";

const useSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const res = await api.get("suppliers");
      return res.data;
    },
  });
};

export default useSuppliers;
