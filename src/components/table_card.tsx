import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data_table";
import TableHeader from "./table_header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import UtilityBar from "./utility_bar";

import { cn } from "@/lib/utils";

const TableCard: React.FC = () => {
  // Function to fetch data
  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },

      // ...
    ];
  }

  const [data, setData] = useState<Payment[]>([]);

  // Effect to fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <Card className={cn("w-[80em]")}>
      <TableHeader />
      <UtilityBar />
      <CardContent className="grid gap-4">
        <DataTable data={data} columns={columns} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TableCard;
