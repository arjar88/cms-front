import { useEffect, useState } from "react";
import { columns } from "../columns";
import { DataTable } from "./data_table";
import TableHeader from "./table_header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import UtilityBar from "../utility_bar";
import ActionBar from "./action_bar";

import { cn } from "@/lib/utils";

const TableCard: React.FC = () => {
  // Function to fetch data
  async function getData(): Promise<any[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "John Doe",
        company: "Tech Solutions",
        stage: "pending",
        phoneNumber: "123-456-7890",
        notes: "Follow up next week.",
        folder: "A1",
        availableFrom: new Date("2024-06-01"),
      },
      {
        id: "2",
        name: "Jane Smith",
        company: "Innovatech",
        stage: "processing",
        phoneNumber: "987-654-3210",
        notes: "Sent proposal.",
        folder: "B2",
        availableFrom: new Date("2024-07-15"),
      },
      {
        id: "3",
        name: "Alice Johnson",
        company: "Future Enterprises",
        stage: "success",
        phoneNumber: "555-123-4567",
        notes: "Contract signed.",
        folder: "C3",
        availableFrom: new Date("2024-05-20"),
      },
      {
        id: "4",
        name: "Bob Brown",
        company: "NextGen Tech",
        stage: "failed",
        phoneNumber: "555-987-6543",
        notes: "No response.",
        folder: "D4",
        availableFrom: new Date("2024-08-10"),
      },
      {
        id: "5",
        name: "Carol White",
        company: "Smart Innovations",
        stage: "pending",
        phoneNumber: "111-222-3333",
        notes: "Meeting scheduled.",
        folder: "E5",
        availableFrom: new Date("2024-06-30"),
      },
    ];
  }

  const [data, setData] = useState<any[]>([]);

  // Effect to fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  useEffect(() => {}, []);

  return (
    <Card className={cn("w-[80em]")}>
      <TableHeader />
      <UtilityBar />
      <ActionBar />
      <CardContent className="grid gap-4">
        <DataTable data={data} columns={columns} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TableCard;
