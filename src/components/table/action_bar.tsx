import React from "react";
import { Trash2, ScrollText, CirclePlus } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define actions with icon components
const actions = [
  { name: "Trash2", icon: <Trash2 className=" text-red-500" /> },
  {
    name: "ScrollText",
    icon: <ScrollText />,
  },
  {
    name: "CirclePlus ",
    icon: <CirclePlus className=" text-green-500" />,
  },
];

const ActionBar: React.FC = () => {
  return (
    <CardContent>
      <div className="flex space-x-4 border border-gray-200 rounded-md overflow-hidden">
        {actions.map((action, index) => (
          <Button
            variant="secondary"
            key={index}
            className="flex items-center px-4 py-2 "
          >
            {action.icon}
          </Button>
        ))}
      </div>
    </CardContent>
  );
};

export default ActionBar;
