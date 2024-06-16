import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { crudApi } from "@/api";
import { fetchData } from "@/store/thunks";
import FileUpload from "./file_uploader";
import { DatePicker } from "./date_picker";
import {
  updateFormData,
  resetFormData,
  FormValue,
} from "../store/slices/formSlice";

interface Property {
  _id: string;
  type: string;
  internalName: string;
  name: string;
  options?: { name: string; internalName: string }[];
  optionsTitle?: string;
}

const AddDataDialog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const properties = useSelector(
    (state: RootState) => state.properties.properties
  );
  const selectedObject = useSelector(
    (state: RootState) => state.objects.selectedObject
  );
  const formData = useSelector((state: RootState) => state.form.formData);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    properties.forEach((p) => {
      dispatch(updateFormData({ key: p._id, value: "" }));
    });
  }, [properties, dispatch]);

  const handleUpdate = (newValue: FormValue, key: string) => {
    dispatch(updateFormData({ key, value: newValue }));
  };

  const handleCreate = async () => {
    //debate if to send from the thunk , where there will get the response from the s3 bucket
    //and then use that to create the data document for the db

    setLoading(true);
    const newData: Record<string, FormValue> = {};
    Object.keys(formData).forEach((key) => {
      newData[key] = formData[key];
    });

    const data = { data: { values: newData, objectId: selectedObject._id } };

    try {
      await crudApi.createItem("data", data);
      dispatch(fetchData(selectedObject._id));
      dispatch(resetFormData());
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
              {property.name}
            </Label>
            <Input
              id={key}
              value={(formData[key] as string) || ""}
              onChange={(e) => handleUpdate(e.target.value, key)}
              className="col-span-3"
            />
          </>
        );

      case "select":
        return (
          <>
            <Label htmlFor={key} className="text-right">
              {property.name}
            </Label>
            <Select onValueChange={(value) => handleUpdate(value, key)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={property.optionsTitle} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {property.options?.map((o) => (
                    <SelectItem key={o.internalName} value={o.internalName}>
                      {o.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        );

      case "image":
        return (
          <>
            <Label htmlFor={key} className="text-right">
              {property.name}
            </Label>
            <FileUpload
              onChange={(files: File[]) => {
                files.forEach((file, index) => {
                  handleUpdate(file, `${key}-${index}`);
                });
              }}
            />
          </>
        );

      case "date":
        return (
          <>
            <Label htmlFor={key} className="text-right">
              {property.name}
            </Label>
            <DatePicker
              onChange={(date: Date) => handleUpdate(date.toISOString(), key)}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <CirclePlus className="text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Entry</DialogTitle>
          <DialogDescription>
            Enter the details below and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {properties.map((property) => (
            <div
              key={property.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              {element(property._id, property)}
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
