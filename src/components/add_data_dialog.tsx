import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Button } from "@/components/ui/button";
import { Loader2, CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { crudApi } from "@/api";
import { fetchData } from "@/store/thunks";

const AddDataDialog: React.FC = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state: RootState) => state.properties);
  const { selectedObject } = useSelector((state: RootState) => state.objects);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    const newData = Object.create(null);
    dataMap.forEach((value) => {
      newData[value.name] = value.value;
    });
    const data = { data: { values: newData, objectId: selectedObject._id } };
    try {
      await crudApi.createItem("data", data);
      dispatch(fetchData(selectedObject._id));
      console.log("object was created successfully");
      dialogClose(); // Close the dialog on successful creation
    } catch (e) {
      console.log("creating new object failed", e);
    } finally {
      setLoading(false);
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
          <Button type="button" onClick={handleCreate} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDataDialog;
