import Chance from "chance";
const chance = new Chance();

export const changeStatus = () => {
  const status = chance.pickone([
    "Available",
    "Allocated",
    "Damaged",
    //"out of service",
  ]);

  return status;
};
