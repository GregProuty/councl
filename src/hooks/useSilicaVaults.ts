import { useQuery } from 'react-query'
import { useAccount, useNetwork } from 'wagmi'

import { SilicaVaults } from '@/consts/silicaVaults'
import { fetchSilicaVault, fetchSilicaVaults } from '@/models/SilicaVaults/fetch'

import type { VaultSummary, Vault, VaultDetails } from '@/models/SilicaVaults/types'
import type { UseQueryOptions, UseQueryResult } from 'react-query'

export const useAllSilicaVaults = (
  reactQueryOptions?: UseQueryOptions,
): UseQueryResult<VaultSummary[], Error> => {
  const { address } = useAccount()
  const { chain } = useNetwork()
  
  // Send back initial local data  immediatelly for skeleton loader to display
  const initialVaultsData: Vault[] | undefined = 
    chain?.id ? SilicaVaults[chain?.id] : undefined

  const queryDisabled =
    !address || !chain || chain.unsupported || !initialVaultsData

  return useQuery({
    queryKey: ["silicaVaults", (chain?.id || 0).toString(), address],
    ...reactQueryOptions,
    enabled:
      !queryDisabled && (!reactQueryOptions || reactQueryOptions.enabled),
    placeholderData: initialVaultsData,
    queryFn: () =>
      !queryDisabled && 
        fetchSilicaVaults(chain?.id, address, initialVaultsData),
  }) as UseQueryResult<VaultSummary[], Error>
}


export const useSingleSilicaVault = (
  vaultSlug: string | undefined | string[],
  reactQueryOptions?: UseQueryOptions,
): UseQueryResult<VaultDetails, Error> => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  // Send back initial local data immediatelly for skeleton loader to display something
  const initialVaultData: Vault | undefined =
    chain?.id ? SilicaVaults[chain?.id]
      .find(v => v.slug === vaultSlug) : undefined
  
  const queryDisabled = 
    !address || !chain || chain.unsupported || !initialVaultData

  return useQuery({
    placeholderData: initialVaultData,
    queryKey: [`silicaVaults_${vaultSlug}`, (chain?.id || 0).toString(), address],
    ...reactQueryOptions,
    enabled:
      !queryDisabled && (!reactQueryOptions || reactQueryOptions.enabled),
    queryFn: () =>
      !queryDisabled && fetchSilicaVault(chain?.id, address, initialVaultData),
  }) as UseQueryResult<VaultDetails, Error>
}
