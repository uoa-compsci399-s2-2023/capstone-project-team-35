// Based on the tutorial in https://blog.webdevsimplified.com/2019-11/how-to-write-custom-hooks/
// This hook is used to store the map data in the local storage fetched from the gbif occurrence API
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
