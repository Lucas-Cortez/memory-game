export const formatTimerNumber = (value: number) => {
  return value.toString().length < 2 ? "0" + value : value;
};
