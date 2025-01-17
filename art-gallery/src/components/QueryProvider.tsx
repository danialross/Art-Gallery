"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type QueryProviderProps = {
  children: ReactNode;
};
// @ts-ignore
const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderProps) => {
  const [client] = useState(queryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
