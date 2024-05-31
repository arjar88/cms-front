import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { crudApi } from "@/api";
import TableCard from "./table/table_card";
import { setClients } from "@/store/clientSlice";
import { setObjects, setSelectedObject } from "@/store/objectSlice";
import { setProperties } from "@/store/propertySlice";
import { setData } from "@/store/dataSlice";

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
        //retrive objects
        const objects: any[] = await crudApi.fetchItems("object", {
          clientId: userClients[0]._id,
        });
        dispatch(setObjects(objects));

        if (objects.length > 0) {
          dispatch(setSelectedObject(objects[0]));
          const properties: any[] = await crudApi.fetchItems("property", {
            objectId: objects[0]._id,
          });
          dispatch(setProperties(properties));

          const data: any[] = await crudApi.fetchItems("data", {
            objectId: objects[0]._id,
          });

          dispatch(setData(data));
          console.log(objects, "objects");

          console.log(data, "data");
        }
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
