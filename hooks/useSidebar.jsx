import { useState, useCallback } from "react";

export const useSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggle = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  return {
    isMinimized,
    toggle,
  };
};
