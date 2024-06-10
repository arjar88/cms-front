import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import FileUpload from "./file_uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { crudApi } from "@/api";
import { fetchData } from "@/store/thunks";

interface Property {
  type: string;
  displayName: string;
  name: string;
  value: string;
}

const AddDataDialog: React.FC = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state: RootState) => state.properties);
  const { selectedObject } = useSelector((state: RootState) => state.objects);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataMap, setDataMap] = useState<Map<string, Property>>(new Map());

  useEffect(() => {
    const initialMap = new Map<string, Property>();

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
      dialogClose(); // Close the dialog on successful creation
    } catch (e) {
      console.log("creating new object failed", e);
    } finally {
      setLoading(false);
    }
  };

  const element = (key: string, property: Property) => {
    switch (property.type) {
      case "string":
        return (
          <>
            <Label htmlFor={key} className="text-right">
              {property.displayName}
            </Label>
            <Input
              id={key}
              value={property.value}
              onChange={(e) => handleUpdate(e.target.value, key)}
              className="col-span-3"
            />
          </>
        );

      case "select":
        return (
          <>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        );

      case "file":
        return (
          <>
            <FileUpload />
          </>
        );

      case "image":
        return (
          <>
            <FileUpload />
          </>
        );

      case "images":
        console.log("Handling multiple images input:", property);
        break;

      case "Number":
        console.log("Handling number input:", property);
        break;

      case "HTML":
        console.log("Handling HTML input:", property);
        break;

      case "url":
        // Handle URL input (with regex validation)
        const urlPattern =
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (urlPattern.test("")) {
          console.log("Handling valid URL input:", property);
        } else {
          console.log("Invalid URL:", property);
        }
        break;

      case "date":
        // Handle date input
        console.log("Handling date input:", property);
        break;

      case "dateTime":
        // Handle dateTime input
        console.log("Handling dateTime input:", property);
        break;

      case "time":
        // Handle time input
        console.log("Handling time input:", property);
        break;

      case "boolean":
        // Handle boolean input (checkbox)
        console.log("Handling boolean input:", property);
        break;

      default:
        console.log("Unknown input type:", property);
        break;
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
              {element(key, value)}
            </div>

            // <div key={key} className="grid grid-cols-4 items-center gap-4">
            //   <Label htmlFor={key} className="text-right">
            //     {value.displayName}
            //   </Label>
            //   <Input
            //     id={key}
            //     value={value.value}
            //     onChange={(e) => handleUpdate(e.target.value, key)}
            //     className="col-span-3"
            //   />
            // </div>
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
