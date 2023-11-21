import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

const FavDashboard = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>Dashboard</PopoverTrigger>
        <PopoverContent className="bg-gray-50 dark:bg-black">
          <ul>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
              recusandae?
            </li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>

            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
              recusandae?
            </li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FavDashboard;
