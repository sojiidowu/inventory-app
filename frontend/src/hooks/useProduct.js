import React from "react";

import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

const fetchProduct = async (id) => {
  const { data } = await api.get(`products/${id}/`);
  return data;
};

const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

export default useProduct;
