import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data_table";
import TableCard from "./table_card";
import Options from "./options";

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

// DemoPage component
const DemoPage: React.FC = () => {
  // State to store data
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
    <div className="container py-10">
      <TableCard>
        <Options options={["Main", "Lists", "Published", "Forms"]}></Options>
        <DataTable columns={columns} data={data} />
      </TableCard>
    </div>
  );
};

export default DemoPage;
