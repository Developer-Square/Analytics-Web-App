import { useCallback } from "react";

const useToDayName = (): ((date: string) => string) =>
  useCallback(
    (date) => new Date(date).toLocaleString("en-us", { weekday: "long" }),
    []
  );

export default useToDayName;
