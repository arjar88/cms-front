import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { crudApi } from "@/api";
import TableCard from "./table/table_card";
import { setClients } from "@/store/clientSlice"; // Import the setClients action

const TablePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);

  // Fetch initial data
  const fetchInitialData = async () => {
    try {
      const clients: any[] = await crudApi.fetchItems("client");
      console.log(clients, "response");
      dispatch(setClients(clients));

      const objects: any[] = await crudApi.fetchItems("client", {
        userId: user.id,
      });
    } catch (e) {
      console.error("Error fetching initial data", e);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="container py-10">
      <TableCard />
    </div>
  );
};

export default TablePage;
