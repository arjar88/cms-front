import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { crudApi } from "@/api";
import { fetchClientData } from "@/store/thunks";
import TableCard from "./table/table_card";
import { setClients, setSelectedClient } from "../store/slices/clientSlice";

const TablePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  // Fetch initial data
  const fetchInitialData = async () => {
    try {
      //retrive clients
      const clients: any[] = await crudApi.fetchItems("client");
      //filter clients
      const userClients = clients.filter((c) =>
        user.clientIds.find((ui: any) => ui === c._id)
      );
      dispatch(setClients(userClients));
      if (userClients.length > 0) {
        dispatch(setSelectedClient(userClients[0]));
        fetchClientData(userClients[0]._id);
      }
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
