import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setSelectedClient } from "@/store/clientSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ClientSelect: React.FC = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.clientSlice.clients);
  const [selectedOption, setSelectedOption] = useState(
    clients.length > 0 ? clients[0].name : ""
  );

  const updateSelected = (value: any) => {
    setSelectedOption(value);
    dispatch(setSelectedClient(value));
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
