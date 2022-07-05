import React from "react";
import { ReactComponent as Link } from "../assets/icons/link.svg";

export const TechnologyCard = (props) => {
  const {
    technology: { name, website, icon, categories, description }
  } = props;

  return (
    <div className="rounded-xl shadow-md bg-white flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center gap-2">
        <img src={`/assets/icons/${icon}`} alt={icon} className="w-10 h-10" />
        <h1 className="text-lg font-bold">{name}</h1>
      </div>
      <div className="p-4 text-sm">
        <p className="mb-3">
          <span className="font-bold">Description:</span>{" "}
          <span>{description}</span>
        </p>

        <p>
          <span className="font-bold">Categories:</span>{" "}
          <span>
            {categories.map((category, id) =>
              id !== categories.length - 1
                ? `${category.name}, `
                : category.name
            )}
          </span>
        </p>
      </div>
      <div className="flex justify-end p-4 mt-auto">
        <a href={website} target="_blank" rel="noreferrer">
          <Link />
        </a>
      </div>
    </div>
  );
};
