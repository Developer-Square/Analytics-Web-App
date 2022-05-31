import { useCallback } from "react";

const useToMonthName = (): ((monthNumber: string) => string) =>
  useCallback(
    (monthNumber) => {
      const convertToInt = parseInt(monthNumber)
      const date = new Date();
      date.setMonth(convertToInt - 1);
    
      return date.toLocaleString('en-US', {
        month: 'long',
      });},
    []
  );

export default useToMonthName;
