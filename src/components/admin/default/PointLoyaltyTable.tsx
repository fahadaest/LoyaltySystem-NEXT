import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdAttachMoney } from "react-icons/md";
import { MdCircle, MdEdit, MdDelete, MdAdd } from "react-icons/md";
import {
  TbCircleLetterS,
  TbCircleLetterM,
  TbCircleLetterL,
  TbCircleLetterX,
} from "react-icons/tb";
import Button from "components/button/Button";
import { IoEyeOutline, IoCreateOutline, IoTrashOutline, IoCopyOutline } from "react-icons/io5";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type RowObj = {
  name: string;
  spendingAmount: number;
  rewardPoints: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function PointLoyaltyTable(props: {
  tableData: any;
  onAddClick: () => void;
}) {
  const { tableData, onAddClick } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState(() => [...tableData]);

  const getSizeIcon = (size: string) => {
    switch (size.toLowerCase()) {
      case "small":
        return <TbCircleLetterS className="text-blue-400 me-2" />;
      case "medium":
        return <TbCircleLetterM className="text-green-400 me-2" />;
      case "large":
        return <TbCircleLetterL className="text-orange-400 me-2" />;
      case "extra large":
        return <TbCircleLetterX className="text-red-400 me-2" />;
      default:
        return <MdCircle className="text-gray-400 me-2" />;
    }
  };

  const handleEdit = (rowData: RowObj) => {
    console.log("Edit clicked for:", rowData);
  };

  const handleDelete = (rowData: RowObj) => {
    console.log("Delete clicked for:", rowData);
  };

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-800 dark:text-white">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("spendingAmount", {
      id: "spendingAmount",
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Spending Amount
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-800 dark:text-white">
          {info.getValue().toFixed(2)} <span className="text-brandGreen font-bold">AED</span>
        </p>
      ),
    }),
    columnHelper.accessor("rewardPoints", {
      id: "rewardPoints",
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Reward Points
        </p>
      ),
      cell: (info) => (
        <span className="bg-brandGreen text-white text-xs font-medium px-4 py-1 rounded-md">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Actions
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            icon={IoEyeOutline}
            text="View"
            size="sm"
            color="bg-brandBlue"
            onClick={() => handleDelete(info.row.original)}
          />
          <Button
            icon={IoCreateOutline}
            text="Edit"
            size="sm"
            color="bg-brandGreen"
            onClick={() => handleEdit(info.row.original)}
          />
          <Button
            icon={IoTrashOutline}
            text="Delete"
            size="sm"
            color="bg-brandRed"
            onClick={() => handleDelete(info.row.original)}
          />

          <Button
            icon={IoCopyOutline}
            text="Copy"
            size="sm"
            color="bg-brandYellow"
            onClick={() => handleDelete(info.row.original)}
          />
        </div>
      ),
    }),
  ];


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra="w-full h-full px-6 pb-6 sm:overflow-x-auto">
      <div className="flex items-center justify-between pt-4">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white">
          Point-Based Loyalties
        </h2>
        <Button
          icon={MdAdd}
          text="Add New Loyalty"
          size="md"
          color="bg-brandGreen"
          hoverColor="hover:bg-brandGreenDark"
          onClick={onAddClick}
        />
      </div>

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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
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
