import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const UtilityBar: React.FC = () => {
  return (
    <CardContent>
      <div className="flex">
        <div className="flex-grow">
          <Input placeholder="Search" />
        </div>
        <div className="flex-grow">
          <Button>Save As A List</Button>
        </div>
        <div className="flex-grow">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Quick Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  );
};

export default UtilityBar;
