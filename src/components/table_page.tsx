import { useEffect } from "react";
import TableCard from "./table/table_card";
import { crudApi } from "@/api";

const TablePage: React.FC = () => {
  useEffect(() => {});

  return (
    <div className="container py-10">
      <TableCard />
    </div>
  );
};

export default TablePage;
