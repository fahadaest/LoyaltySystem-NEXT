import React, { useState } from "react";
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

import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5";

interface Admin {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: string;
  status?: string;
}

interface AdminListTableProps {
  data: Admin[];
  onEdit: (admin: Admin) => void;
  onDelete: (admin: Admin) => void;
  onView: (admin: Admin) => void;
}

export default function AdminListTable({
  data,
  onEdit,
  onDelete,
  onView,
}: AdminListTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Admin, any>[] = [
    {
      id: "nameEmail",
      header: "Name & Email",
      cell: ({ row }) => {
        const admin = row.original;
        const initials = admin.firstName[0] + (admin.lastName?.[0] || "");
        return (
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-navy-500 flex items-center justify-center text-white font-bold text-sm">
              {initials.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                {admin.firstName} {admin.lastName || ""}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {admin.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button
              icon={IoCreateOutline}
              text="Edit"
              size="sm"
              color="bg-brandGreen"
              onClick={() => onEdit(row)}
            />
            <Button
              icon={IoTrashOutline}
              text="Delete"
              size="sm"
              color="bg-brandRed"
              onClick={() => onDelete(row)}
            />
            <Button
              icon={IoEyeOutline}
              text="View"
              size="sm"
              color="bg-brandBlue"
              onClick={() => onView(row)}
            />
          </div>
        );
      },
    },
  ];


  const table = useReactTable({
    data,
    columns,
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