import { useCallback } from "react";

const useSetDate = (): ((
    timestamp: number,
  type?: string
) => string) =>
  useCallback((timestamp, type) => {
    const date = new Date(timestamp).toLocaleDateString();
    if (type === "year") {
      return date.slice(6);
    } else if (type === "month") {
      return date.slice(3, 5);
    } else if (type === "day") {
      return date.slice(0, 2);
    }
    return date;
  }, []);

export default useSetDate;
