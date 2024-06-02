import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";

interface AddDataDialogProps {}

const AddDataDialog: React.FC<AddDataDialogProps> = () => {
  const { properties } = useSelector((state: RootState) => state.properties);
  const initialMap = new Map<
    string,
    { type: string; name: string; value: string }
  >();

  properties.forEach((p) =>
    initialMap.set(p._id, { type: p.type, name: p.name, value: "" })
  );

  const [dataMap, setDataMap] =
    useState<Map<string, { type: string; name: string; value: string }>>(
      initialMap
    );

  const handleUpdate = (newValue: string, key: string) => {
    setDataMap((prevMap) => {
      const updatedMap = new Map(prevMap);
      const propObject = updatedMap.get(key);

      if (propObject) {
        updatedMap.set(key, { ...propObject, value: newValue });
      }
      return updatedMap;
    });
  };

  const handleSave = () => {
    console.log("DataMap:", dataMap);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <CirclePlus className=" text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Data</DialogTitle>
          <DialogDescription>
            Enter the details below and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[...dataMap].map(([key, value]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {value.name}
              </Label>
              <Input
                id={key}
                value={value.value}
                onChange={(e) => handleUpdate(e.target.value, key)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDataDialog;
