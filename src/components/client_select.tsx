import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ClientSelect: React.FC = () => {
  const clients = useSelector((state: RootState) => state.clientSlice.clients);

  return (
    <div className="select-container">
      <Select>
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
