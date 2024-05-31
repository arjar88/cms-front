import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientData } from "../store/thunks";
import { RootState } from "../store/store";
import { setSelectedClient } from "../store/clientSlice";

const useFetchBaseClientData = () => {
  const dispatch = useDispatch();
  const selectedClient = useSelector(
    (state: RootState) => state.clients.selectedClient
  );

  useEffect(() => {
    if (selectedClient) {
      dispatch(fetchClientData(selectedClient._id));
    }
  }, [selectedClient, dispatch]);

  return {
    setSelectedClient: (client: any) => dispatch(setSelectedClient(client)),
  };
};

export default useFetchBaseClientData;
