import React, { useState } from "react";
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable, ColumnDef } from "@tanstack/react-table";
import Button from "components/button/Button";
import Card from "components/card";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { IoArrowDown, IoArrowUp, IoSwapVertical } from "react-icons/io5";

interface TableProps {
  data: any[];
  isLoading: boolean;
  columns: ColumnDef<any>[];
  onEdit?: (admin: any) => void;
  onDelete?: (admin: any) => void;
  onView?: (admin: any) => void;
  onDetail?: (admin: any) => void;
}

export default function Table({ data, columns, isLoading, onEdit, onDelete, onView, onDetail }: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const actionColumn: ColumnDef<any> = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        {onEdit && (
          <Button
            icon={IoCreateOutline}
            text="Edit"
            size="xs"
            color="bg-brandGreen"
            onClick={() => onEdit(row.original)}
          />
        )}
        {onDelete && (
          <Button
            icon={IoTrashOutline}
            text="Delete"
            size="xs"
            color="bg-brandRed"
            onClick={() => onDelete(row.original)}
          />
        )}
        {onView && (
          <Button
            icon={IoEyeOutline}
            text="View"
            size="xs"
            color="bg-brandBlue"
            onClick={() => onView(row.original)}
          />
        )}
        {onDetail && (
          <Button
            icon={IoEyeOutline}
            text="Detail"
            size="xs"
            color="bg-brandBlue"
            onClick={() => onDetail(row.original)}
          />
        )}
      </div>
    ),
    footer: "Actions",
  };

  const extendedColumns = [...columns, actionColumn];

  const table = useReactTable({
    data,
    columns: extendedColumns,
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
                    className={`px-4 py-3 text-left text-[10px] font-semibold uppercase cursor-pointer ${header.column.id === "actions" ? "text-right" : ""}`}
                    style={header.column.id === "actions" ? { width: '120px' } : {}}
                  >
                    <div className="flex items-center">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      {header.column.getCanSort() && (
                        <div className="ml-2 flex items-center">
                          {header.column.getIsSorted() === "asc" ? (
                            <IoArrowUp className="h-4 w-4 text-gray-600" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <IoArrowDown className="h-4 w-4 text-gray-600" />
                          ) : (
                            <IoSwapVertical className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
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
                    className={`px-4 py-3 text-sm ${cell.column.id === "actions" ? "text-right" : ""}`}
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
