import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useFetchBaseClientData from "../hooks/useFetchBaseClientData";

const ClientSelect: React.FC = () => {
  const { clients } = useSelector((state: RootState) => state.clients);
  const selectedClient = useSelector(
    (state: RootState) => state.clients.selectedClient
  );

  const [selectedOption, setSelectedOption] = useState(
    selectedClient ? selectedClient.name : "Select Client"
  );

  const { setSelectedClient } = useFetchBaseClientData();

  // Update selectedOption when selectedClient changes
  useEffect(() => {
    setSelectedOption(selectedClient ? selectedClient.name : "Select Client");
  }, [selectedClient]);

  const updateSelected = (value: any) => {
    const selected = clients.find((client) => client.name === value);
    setSelectedOption(value);
    setSelectedClient(selected); // This will trigger fetchClientData via the custom hook
  };

  return (
    <div className="select-container">
      <Select
        value={selectedOption}
        onValueChange={(value) => updateSelected(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Client" />
        </SelectTrigger>
        <SelectContent>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.name}>
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientSelect;
