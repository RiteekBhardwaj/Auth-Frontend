import React from "react";
import { Menu } from "../ui/Menu";

export const DasboardMenu = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="tex-base font-bold tracking-widest">RITEEK.</h1>
        <Menu />
      </div>
    </div>
  );
};
