import { useCallback } from "react";

const useTimeConverter = () : ((timestamp: any) => string) => 
    useCallback((timestamp) => {
    const date = new Date(timestamp)
    let time: any = `${date.getHours() < 10 ? '0'+date.getHours() : date.getHours()}:${date.getMinutes()}`
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
    }, [])

  export default useTimeConverter;