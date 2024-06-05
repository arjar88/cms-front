import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedObject } from "@/store/slices/objectSlice";
import { fetchAndSetProperties } from "@/store/slices/propertySlice";

const SideNav: React.FC = () => {
  const { objects } = useSelector((state: RootState) => state.objects);
  const { selectedObject } = useSelector((state: RootState) => state.objects);

  const [selectedObjectId, setSelectedObjectId] = useState<string>(
    selectedObject?._id
  );

  const dispatch = useDispatch();

  const handleUpdateSelectedObject = (objectId: string) => {
    const newSelected = objects.find((o) => o._id === objectId);
    setSelectedObjectId(objectId);
    dispatch(setSelectedObject(newSelected));
  };

  useEffect(() => {
    if (selectedObjectId) {
      dispatch(fetchAndSetProperties(selectedObjectId));
    }
  }, [selectedObjectId, dispatch]);

  return (
    <div className="flex flex-col p-4 border-r ">
      {/* Navigation header (optional)
      {navHeader && (
        <div className="flex items-center mb-4">
          {navHeader.icon && <div className="mr-2">{navHeader.icon}</div>}
          <div className="font-bold">{navHeader.title}</div>
        </div>
      )} */}

      <nav>
        <ul>
          {objects.map((object) => (
            <li key={object._id} className="flex items-center mb-2">
              {/* <div className="mr-2">{option.icon}</div> */}
              <div
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleUpdateSelectedObject(object._id)}
              >
                {object.name}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
