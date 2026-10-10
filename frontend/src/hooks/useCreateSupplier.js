import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";

const createSupplier = async (supplierData) => {
  const { data } = await api.post("suppliers/", supplierData);
  return data;
};

const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
};

export default useCreateSupplier;
