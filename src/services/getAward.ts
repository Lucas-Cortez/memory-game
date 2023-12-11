import AWARDS from "../../data/awards.json";

export const getAward = (seconds: number) => {
  for (const award of AWARDS) {
    if (seconds <= award.lessOrEqualThanSeconds) return award.name;
  }

  return null;
};
