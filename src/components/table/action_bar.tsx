import React from "react";
import { Trash2, ScrollText } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import AddDataDialog from "../add_data_dialog";

const actions = [
  { name: "Trash2", component: <Trash2 className=" text-red-500" /> },
  {
    name: "ScrollText",
    component: <ScrollText />,
  },
  {
    name: "CirclePlus ",
    component: <AddDataDialog />,
  },
];

const ActionBar: React.FC = () => {
  return (
    <CardContent>
      <div className="flex space-x-4 border border-gray-200 rounded-md overflow-hidden">
        {actions.map((action) => (
          <div key={action.name} className="flex items-center px-4 py-2 ">
            {action.component}
          </div>
        ))}
      </div>
    </CardContent>
  );
};

export default ActionBar;
