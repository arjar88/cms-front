import React, { useState, useEffect } from "react";
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
import { crudApi } from "@/api";

interface AddDataDialogProps {}

const AddDataDialog: React.FC<AddDataDialogProps> = () => {
  const { properties } = useSelector((state: RootState) => state.properties);
  const { selectedObject } = useSelector((state: RootState) => state.objects);

  const [dataMap, setDataMap] = useState<
    Map<
      string,
      { type: string; displayName: string; name: string; value: string }
    >
  >(new Map());

  useEffect(() => {
    const initialMap = new Map<
      string,
      { type: string; displayName: string; name: string; value: string }
    >();

    properties.forEach((p) =>
      initialMap.set(p._id, {
        type: p.type,
        displayName: p.name,
        name: p.internalName,
        value: "",
      })
    );

    setDataMap(initialMap);
  }, [properties]);

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

  const handleCreate = async () => {
    const newData = Object.create(null);
    dataMap.forEach((value, key) => {
      newData[value.name] = value.value;
    });
    //structure is consistent with backend controller
    const data = { data: { values: newData, objectId: selectedObject._id } };
    try {
      await crudApi.createItem("data", data);
      console.log("object was created succesfully");
    } catch (e) {
      console.log("creating new object failed", e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <CirclePlus className="text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Entry</DialogTitle>
          <DialogDescription>
            Enter the details below and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[...dataMap].map(([key, value]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {value.displayName}
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
          <Button type="button" onClick={handleCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDataDialog;
