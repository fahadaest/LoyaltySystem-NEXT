// components/table/DataTable.tsx

import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import Button from "components/button/Button";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline, IoCopyOutline } from "react-icons/io5";
import Card from "components/card";

type ActionType = "view" | "edit" | "delete" | "copy";

interface Action {
  type: ActionType;
  label: string;
  icon: React.ElementType;
  onClick: (rowData: any) => void;
  color: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  title?: string;
  onAddClick?: () => void;
  addButtonLabel?: string;
  actions?: Action[];
  extraColumns?: ColumnDef<T, any>[]; // e.g. for role-based or dynamic display like Admin
}

export default function DataTable<T extends object>({
  data,
  columns,
  title,
  onAddClick,
  addButtonLabel = "Add New",
  actions,
  extraColumns = [],
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns: [
      ...columns,
      ...extraColumns,
      ...(actions?.length
        ? [
          {
            id: "actions",
            header: () => (
              <p className="text-sm font-semibold text-gray-700 dark:text-white">Actions</p>
            ),
            cell: (info: any) => (
              <div className="flex items-center gap-2 justify-end">
                {actions.map((action) => (
                  <Button
                    key={action.type}
                    icon={action.icon}
                    text={action.label}
                    size="sm"
                    color={action.color}
                    onClick={() => action.onClick(info.row.original)}
                  />
                ))}
              </div>
            ),
          },
        ]
        : []),
    ],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card>
      <div className=" w-full h-full px-6 pb-6 sm:overflow-x-auto">
        {title && (
          <div className="flex items-center justify-between pt-4">
            <h2 className="text-xl font-bold text-navy-700 dark:text-white">{title}</h2>
            {onAddClick && (
              <Button
                icon={IoCreateOutline}
                text={addButtonLabel}
                size="md"
                color="bg-brandGreen"
                hoverColor="hover:bg-brandGreenDark"
                onClick={onAddClick}
              />
            )}
          </div>
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-xl overflow-hidden">
            <thead className="bg-gray-100 dark:bg-navy-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 cursor-pointer ${header.column.id === "actions" ? "text-right" : ""
                        }`}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`transition-all duration-200 ${index % 2 === 0
                    ? "bg-white dark:bg-navy-700"
                    : "bg-gray-50 dark:bg-navy-800"
                    } hover:bg-gray-100 dark:hover:bg-navy-600`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`py-3 px-4 text-sm ${cell.column.id === "actions" ? "text-right" : ""
                        }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>

  );
}
