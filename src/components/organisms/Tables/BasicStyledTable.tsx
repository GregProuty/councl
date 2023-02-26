import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { useState } from "react"

import { Skeleton } from "@/components/atoms/SkeletonsLoaders"

import type { SortingState , TableOptions} from "@tanstack/react-table"


interface StyledTableProps<TData> {
  footerVisible?: boolean,
  isLoading: boolean

  tableOptions: Omit<TableOptions<TData>, "getCoreRowModel">
  // can pass through any styles here
}

/**
  * Presentational wrapper around `@tanstack/react-table`.
  *
  * @param props.tableOptions - see `@tanstack/react-table` `TableOptions`
  * @param props.tableOptions.data - The items to show in the table (pre-sort)
  * @param props.tableOptions.columns - How to sort and render the items in the
  *                                     table. See "./SilicaV2_1Columns.tsx".
  * @param props.tableOptions.meta - for passing e.g. external handlers
  *                                  (e.g. modal open),
  *                                  shared data (e.g. oracle data)
  * @param props.isLoading - Use this to render 10 rows of skeletons.
  * @param props.footerVisible - By default we do not render a footer.
  */
const BasicStyledTable = <TData,>({
  tableOptions,
  isLoading,
  footerVisible,
}: StyledTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    ...tableOptions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <table className="w-full table-auto">
      <thead className="border-b-2 border-black">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th className="px-2 py-1" key={header.id}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {isLoading
          ? [...Array(10)].map((_, i) => (
            <tr
              className="border-b border-gray-200 overflow-hidden"
              key={i}
            >
              {table.getVisibleLeafColumns().map((_, i) => (
                <td key={i}><Skeleton className="max-w-[8rem] m-auto" /></td>
              ))}
            </tr>
          ))
          : table.getRowModel().rows.map(row => (
            <tr
              className="border-b border-gray-200 overflow-hidden"
              key={row.id}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  className="p-2 text-center"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )
          )}
      </tbody>
      {footerVisible && <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>}
    </table>
  )
}

export default BasicStyledTable
