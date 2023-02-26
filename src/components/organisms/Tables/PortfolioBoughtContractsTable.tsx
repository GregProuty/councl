import BasicStyledTable from "./BasicStyledTable"
import {
  AssetType,
  ButtonColumn,
  ContractSize,
  ContractExpiry,
  ContractStatus,
  NextDue,
  Payment,
} from "./SilicaV2_1Columns"

import type { SilicaV2_1 } from "@/models/SilicaContract/types"

const BUYER_PORTFOLIO_COLUMNS = [
  AssetType,
  ContractSize,
  ContractExpiry,
  ContractStatus,
  NextDue,
  Payment,
  ButtonColumn,
]

interface PortfolioBoughtContractsTableProps {
  contracts: SilicaV2_1[]
  isLoading: boolean
}

const PortfolioBoughtContractsTable = ({
  contracts,
  isLoading,
}: PortfolioBoughtContractsTableProps) => (
  <BasicStyledTable
    isLoading={isLoading}
    tableOptions={{
      columns: BUYER_PORTFOLIO_COLUMNS,
      data: contracts,
    }}
  />
)

export default PortfolioBoughtContractsTable
