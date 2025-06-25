import React, { useState } from "react";
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable, ColumnDef } from "@tanstack/react-table";
import Button from "components/button/Button";
import Card from "components/card";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { IoArrowDown, IoArrowUp, IoSwapVertical } from "react-icons/io5";

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

const StatusBadge = ({ status }: { status: string }) => {
  const statusClasses: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusIcons: Record<string, JSX.Element> = {
    active: <CheckCircle className="mr-1 h-4 w-4 text-green-800" />,
    inactive: <XCircle className="mr-1 h-4 w-4 text-gray-800" />,
    pending: <Clock className="mr-1 h-4 w-4 text-yellow-800" />,
    cancelled: <XCircle className="mr-1 h-4 w-4 text-red-800" />,
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium tracking-wider rounded-full ${statusClasses[status.toLowerCase()] || "bg-gray-200 text-gray-700"} inline-flex items-center`}
    >
      {statusIcons[status.toLowerCase()] || <div className="mr-1 h-4 w-4"></div>}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

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
      accessorFn: (admin) => `${admin.firstName.toLowerCase()} ${admin.lastName?.toLowerCase() || ""}`,
      cell: ({ row }) => {
        const admin = row.original;
        const initials = admin.firstName[0] + (admin.lastName?.[0] || "");
        return (
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-brandGreenHighlight dark:bg-navy-500 flex items-center justify-center text-white font-bold text-sm">
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
      cell: (info) => <StatusBadge status={info.getValue() || "inactive"} />,
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
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase cursor-pointer ${header.column.id === "actions" ? "text-right" : ""}`}
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