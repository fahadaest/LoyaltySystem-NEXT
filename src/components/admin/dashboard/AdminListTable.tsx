import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import Button from "components/button/Button";
import Card from "components/card";

export type ActionType = "view" | "edit" | "delete" | "copy";

interface Action {
  type: ActionType;
  label: string;
  icon: React.ElementType;
  onClick: (rowData: any) => void;
  color: string;
}

interface AdminListTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  actions?: Action[];
}

export default function AdminListTable<T extends object>({
  data,
  columns,
  actions = [],
}: AdminListTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: [
      ...columns,
      ...(actions.length
        ? [
          {
            id: "actions",
            header: () => <span>Actions</span>,
            cell: (info: any) => (
              <div className="flex justify-end gap-2">
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
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-navy-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer ${header.column.id === "actions" ? "text-right" : ""
                      }`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`transition-all ${idx % 2 === 0
                  ? "bg-white dark:bg-navy-700"
                  : "bg-gray-50 dark:bg-navy-800"
                  } hover:bg-gray-100 dark:hover:bg-navy-600`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-3 text-sm ${cell.column.id === "actions" ? "text-right" : ""
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
    </Card>
  );
}
