import React from "react";
import Card from "components/card";
import { MdCircle, MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { TbCircleLetterS, TbCircleLetterM, TbCircleLetterL, TbCircleLetterX } from "react-icons/tb";
import Button from "components/button/Button";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

type RowObj = {
  id: string;
  size: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ProductSizeTable(props: { tableData: RowObj[]; onAddClick: () => void; onDeleteClick: (id: string) => void; }) {
  const { tableData, onAddClick, onDeleteClick } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);

  React.useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  const getSizeIcon = (size: string) => {
    const normalizedSize = size ? size.toLowerCase() : "unknown";

    switch (normalizedSize) {
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


  const handleDelete = (rowData: RowObj) => {
    console.log(rowData)
    onDeleteClick(rowData.id);
  };

  const handleEdit = (rowData: RowObj) => {
  };

  const columns = [
    columnHelper.accessor("size", {
      id: "size",
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">SIZE</p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {getSizeIcon(info.getValue())}
          <p className="text-sm font-medium text-gray-800 dark:text-white capitalize">{info.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">Actions</p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            icon={MdEdit}
            text="Edit"
            size="sm"
            color="bg-brandGreen"
            onClick={() => handleEdit(info.row.original)}
          />
          <Button
            icon={MdDelete}
            text="Delete"
            size="sm"
            color="bg-brandRed"
            onClick={() => handleDelete(info.row.original)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card extra="w-full h-full px-6 pb-6 sm:overflow-x-auto">
      <div className="flex items-center justify-between pt-4">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white">Size Listing</h2>
        <Button
          icon={MdAdd}
          text="Add Size"
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
                    className={`py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 cursor-pointer ${header.column.id === "actions" ? "text-right" : ""}`}
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
                className={`transition-all duration-200 ${index % 2 === 0 ? "bg-white dark:bg-navy-700" : "bg-gray-50 dark:bg-navy-800"} hover:bg-gray-100 dark:hover:bg-navy-600`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`py-3 px-4 text-sm ${cell.column.id === "actions" ? "text-right" : ""}`}
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