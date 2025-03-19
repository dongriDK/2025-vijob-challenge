"use client";

import { ReactNode } from "react";
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60,
      },
      mutations: {
        retry: false,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;
export const getQueryClient = () => {
  if (isServer) {
    // server일 경우 매번 새로운 queryClient 생성
    return makeQueryClient();
  } else {
    // browser일 경우 queryClient가 존재하지 않을 경우에만 새로운 queryClient 생성
    // react가 새 client를 만들게 하기 위해 중요함
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export const TanstackQueryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
