import { CardHeader, CardTitle } from "@/components/ui/card";
import Options from "./options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import ClientSelect from "../client_select";

const TableHeader: React.FC = () => {
  return (
    <CardHeader className="text-left">
      <CardTitle>
        <ClientSelect />
      </CardTitle>
      <div className="flex">
        <div className="flex-grow">
          <Options options={["Main", "Lists", "Published", "Forms"]}></Options>
        </div>
        <div className="flex-grow">
          <Settings></Settings>
        </div>
        <div className="flex-grow">
          <Avatar className="-mt-2 ml-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </CardHeader>
  );
};

export default TableHeader;
