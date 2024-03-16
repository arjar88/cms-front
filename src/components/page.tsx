import TableCard from "./table_card";

// DemoPage component
const DemoPage: React.FC = () => {
  return (
    <div className="container py-10">
      <TableCard>
        {/* <Options options={["Main", "Lists", "Published", "Forms"]}></Options>
        <DataTable columns={columns} data={data} /> */}
      </TableCard>
    </div>
  );
};

export default DemoPage;
