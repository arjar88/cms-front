import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SideNav: React.FC = () => {
  const { objects } = useSelector((state: RootState) => state.objects);

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
              <a
                href={object.link}
                className="text-blue-600 hover:text-blue-800"
              >
                {object.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
