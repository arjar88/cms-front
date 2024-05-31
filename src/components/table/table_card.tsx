import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useColumns } from "../columns";
import { DataTable } from "./data_table";
import TableHeader from "./table_header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import UtilityBar from "../utility_bar";
import ActionBar from "./action_bar";
import { cn } from "@/lib/utils";

const TableCard: React.FC = () => {
  const columns = useColumns();
  const { data } = useSelector((state: RootState) => state.data); // Ensure the correct slice

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
