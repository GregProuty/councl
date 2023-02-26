import Image from "next/image"

import { Button } from "@/components/atoms/Button"
import Checkbox from '@/components/atoms/Checkbox'

import * as fmt from "@/models/SilicaContract/formatters"
import * as SM from "@/models/SilicaContract/math"
import { Status, STATUS_STR } from "@/models/SilicaContract/types"

import { bigNumberComparator } from "./comparators"

import type { SilicaV2_1 } from "@/models/SilicaContract/types"
import type { ColumnDef } from "@tanstack/react-table"
export const ContractSize: ColumnDef<SilicaV2_1> = {
  accessorKey: "totalSilicaSold",
  cell: ({ row }) => <>{fmt.silicaSizeStr(row.original)}</>,
  header: "Contract Size",
  sortingFn: bigNumberComparator,
}

export const ContractExpiry: ColumnDef<SilicaV2_1> = {
  accessorFn: SM.endDateUTC,
  cell: ({ row }) => <>{fmt.silicaEndDateStr(row.original)}</>,
  header: "Expiration Date",
  sortingFn: "datetime",
}

export const ContractStatus: ColumnDef<SilicaV2_1> = {
  accessorKey: "status",
  cell: ({ row }) => (
    <div className="flex justify-center">
      {STATUS_STR[row.original.status]}
      {row.original.status === Status.Defaulting && (
        // TODO: maybe we should use a custom tooltip,
        //       as browser builtin "title" has a delay
        <Image
          alt="Silica defaulting warning"
          className="ml-1"
          height={16}
          src="/images/icons/caution.svg"
          title="This contract can still be saved if the reward expected next day is deposited"
          width={16}
        />
      )}
    </div>
  ),
  header: "Status",
}

export const AssetType: ColumnDef<SilicaV2_1> = {
  accessorKey: "assetType",
  cell: () => <div>BTC</div>,
  header: "Asset Type",
}

export const Payment: ColumnDef<SilicaV2_1> = {
  accessorKey: "payment",
  cell: () => <div>0.37037/800 TestUSDT</div>,
  header: "Payment",
}

export const NextDue: ColumnDef<SilicaV2_1> = {
  accessorKey: "nextDue",
  cell: () => <div>0.064325 TestwETH</div>,
  header: "Next Due",
}

export const ButtonColumn: ColumnDef<SilicaV2_1> = {
  accessorKey: "button",
  cell: () => 
    <div className='flex justify-end'>
      <Button className="w-28 min-h-12 mt-0" label={"Save"} onClick={() => ''} />
    </div>,
  header: "Header",
}

export const CheckboxColumn: ColumnDef<SilicaV2_1> = {
  accessorKey: "button",
  cell: () => 
    <div className='flex justify-center items-center'>
      <Checkbox />
    </div>,
  header: "Checked",
}
