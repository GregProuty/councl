import { useQuery as tanstackQuery } from "react-query"

import { useIsHydrated } from "./useIsHydrated"

import type {
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "react-query"

/**
 * Thin wrapper around `react-query`, which disables it on initial load,
 * to avoid hydration errors. We don't want to prefetch queries server-side,
 * since:
 * 1) we are doing SSG, not SSR
 * 2) queries are dependent on client-side WAGMI state
 */
export const useQuery = <Data, Error,>(
  queryKey: QueryKey,
  queryFn: (context: QueryFunctionContext) => Promise<Data>,
  queryOptions: UseQueryOptions<Data, Error>,
): UseQueryResult<Data, Error> => {
  const isHydrated = useIsHydrated()
  const enabled = queryOptions.enabled !== false && isHydrated
  return tanstackQuery(queryKey, queryFn, { ...queryOptions, enabled })
}
