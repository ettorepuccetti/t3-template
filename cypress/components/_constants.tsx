import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, type TRPCClientErrorLike } from "@trpc/react-query";
import {
  type UseTRPCMutationResult,
  type UseTRPCQueryResult,
} from "@trpc/react-query/shared";
import { type SinonStub } from "cypress/types/sinon";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import { useState } from "react";
import superjson from "superjson";
import { MergedStoreProvider } from "~/hooks/useStoreContext";
import { api, getBaseUrl } from "~/utils/api";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const session: Session = {
  expires: "2022-10-20T11:00:00.000Z",
  user: {
    id: "test",
    name: "test",
  },
};

function WrapperComponentForTesting({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
      }),
  );
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  );
  return (
    <main
      className={cn(
        "bg-background min-h-screen font-sans antialiased flex flex-col",
        fontSans.variable,
      )}
    >
      <div className="flex flex-col flex-grow items-center justify-center p-4">
        <SessionProvider session={session}>
          <MergedStoreProvider>
            <api.Provider client={trpcClient} queryClient={queryClient}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </api.Provider>
          </MergedStoreProvider>
        </SessionProvider>
      </div>
    </main>
  );
}

export function mountWithContext(
  children: React.ReactNode,
  session: Session | null,
) {
  cy.mount(
    <WrapperComponentForTesting session={session}>
      {children}
    </WrapperComponentForTesting>,
  );
}

/**
 * Builds a mock of the trpc mutation hook with the given stub and input variables.
 * The returned object can be set in the store in place of the real mutation hook.
 * @param stub cypress stub to be used as mutation
 * @param inputVariables input for the mutation
 * @returns a mock of the trpc mutation hook
 */
export function buildTrpcMutationMock<TData, TVariables>(
  stub: SinonStub,
): UseTRPCMutationResult<
  TData,
  TRPCClientErrorLike<never>,
  TVariables,
  unknown
> {
  return {
    data: undefined,
    error: null,
    status: "idle",
    mutate: stub,
    context: undefined,
    isError: false,
    isLoading: false,
    isSuccess: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    reset: () => {},
    isIdle: true,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    variables: undefined, //input will be passed as argument to the stub, unclear how still...
    mutateAsync: stub.resolves(),
    trpc: { path: "" },
  };
}

/**
 * Builds a mock of the trpc query hook with the given mocked data
 * The returned object can be set in the store in place of the real query hook.
 * @param mockData mock data to be returned by the query
 * @returns a mock of the trpc query hook
 */
export function buildTrpcQueryMock<TData>(
  mockData: TData,
): UseTRPCQueryResult<TData, TRPCClientErrorLike<never>> {
  return {
    data: mockData,
    error: null,
    status: "success",
    isError: false,
    isLoading: false,
    isSuccess: true,
    refetch: () =>
      new Promise((resolve) => resolve(buildTrpcQueryMock(mockData))),
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    isLoadingError: false,
    isFetching: false,
    isFetched: true,
    dataUpdatedAt: Date.now(),
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchStatus: "idle",
    isFetchedAfterMount: true,
    isInitialLoading: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetchError: false,
    isRefetching: false,
    isStale: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    remove: () => {},
    trpc: { path: "" },
  };
}
