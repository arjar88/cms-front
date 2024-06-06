import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Lead = {
  [key: string]: any;
};

export const useColumns = (): ColumnDef<Lead>[] => {
  // Using useSelector to get properties from the Redux store
  const { properties } = useSelector((state: RootState) => state.properties);

  // Memoizing the columns array to avoid unnecessary recalculations
  const columns: ColumnDef<Lead>[] = useMemo(() => {
    if (!properties || properties.length === 0) return [];

    return properties.map((property) => ({
      accessorKey: property.internalName,
      header: () => <div className="text-center">{property.name}</div>,
      cell: ({ row }) => {
        const value = row.getValue(property.internalName);
        return <div className="text-center">{value}</div>;
      },
    }));
  }, [properties]); // Recalculate columns only when properties change

  // Returning the full columns array, including a static select column
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="w-4 h-4"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns, // Dynamic columns based on properties
  ];
};
