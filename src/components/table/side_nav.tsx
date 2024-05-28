import React from "react";

interface NavOption {
  name: string;
  icon: React.ReactNode;
  link: string;
}

interface SideNavProps {
  options: NavOption[];
  navHeader?: { icon?: React.ReactNode; title: string };
}

const SideNav: React.FC<SideNavProps> = ({ options, navHeader }) => {
  return (
    <div className="flex flex-col p-4 border-r ">
      {/* Navigation header (optional) */}
      {navHeader && (
        <div className="flex items-center mb-4">
          {navHeader.icon && <div className="mr-2">{navHeader.icon}</div>}
          <div className="font-bold">{navHeader.title}</div>
        </div>
      )}

      {/* Navigation options */}
      <nav>
        <ul>
          {options.map((option, index) => (
            <li key={index} className="flex items-center mb-2">
              <div className="mr-2">{option.icon}</div>
              <a
                href={option.link}
                className="text-blue-600 hover:text-blue-800"
              >
                {option.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
