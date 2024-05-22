import { ColumnDef } from "@tanstack/react-table";

export type Lead = {
  id: string;
  name: number;
  company: string;
  stage: "pending" | "processing" | "success" | "failed";
  phoneNumber: string;
  notes: string;
  folder: string;
  availableFrom: Date;
};

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div className="capitalize">{name}</div>;
    },
  },
  {
    accessorKey: "company",
    header: () => <div className="text-center">Company</div>,
    cell: ({ row }) => {
      const company = row.getValue("company");
      return <div className="capitalize">{company}</div>;
    },
  },
  {
    accessorKey: "stage",
    header: () => <div className="text-center">Stage</div>,
    cell: ({ row }) => {
      const stage = row.getValue("stage");

      return <div className="capitalize">{stage}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="text-center">Phone Number</div>,
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber");

      return <div className="capitalize">{phoneNumber}</div>;
    },
  },
  {
    accessorKey: "notes",
    header: () => <div className="text-center">Notes</div>,
    cell: ({ row }) => {
      const notes = row.getValue("notes");
      return <div className="text-center font-medium">{notes}</div>;
    },
  },
  {
    accessorKey: "folder",
    header: () => <div className="text-center">Folder</div>,
    cell: ({ row }) => {
      const folder = row.getValue("folder");
      return <div className="text-center font-medium">{folder}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => {
      const id = row.getValue("id");
      return <div className="text-center font-medium">{id}</div>;
    },
  },
  {
    accessorKey: "availableFrom",
    header: () => <div className="text-center">Available From</div>,
    cell: ({ row }) => {
      const availableFrom = new Date(row.getValue("availableFrom"));
      const formattedDate = availableFrom.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div className="text-center font-medium">{formattedDate}</div>;
    },
  },
];
