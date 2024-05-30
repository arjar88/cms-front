import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { crudApi } from "@/api";
import TableCard from "./table/table_card";
import { setClients } from "@/store/clientSlice";
import { setObjects } from "@/store/objectSlice";

const TablePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);

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

      //retrive objects
      const objects: any[] = await crudApi.fetchItems("object", {
        clientId: userClients[0]._id,
      });
      dispatch(setObjects(objects));

      console.log(objects, "objects");
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
