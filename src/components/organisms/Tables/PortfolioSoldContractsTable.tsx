import BasicStyledTable from "./BasicStyledTable"
import {
  // AssetType,
  CheckboxColumn,
  ButtonColumn,
  ContractSize,
  ContractExpiry,
  ContractStatus,
  NextDue,
  Payment,
} from "./SilicaV2_1Columns"

import type { SilicaV2_1 } from "@/models/SilicaContract/types"

const SELLER_PORTFOLIO_COLUMNS = [
  // AssetType,
  CheckboxColumn,
  ContractSize,
  ContractExpiry,
  ContractStatus,
  NextDue,
  Payment,
  ButtonColumn,
]

interface PortfolioSoldContractsTableProps {
  contracts: SilicaV2_1[]
  isLoading: boolean
}

const PortfolioSoldContractsTable = ({
  contracts,
  isLoading,
}: PortfolioSoldContractsTableProps) => (
  <BasicStyledTable
    isLoading={isLoading}
    tableOptions={{
      columns: SELLER_PORTFOLIO_COLUMNS,
      data: contracts,
    }}
  />
)

export default PortfolioSoldContractsTable
