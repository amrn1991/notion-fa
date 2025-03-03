import { useRef, useState, useEffect } from "react";

export const useOverflowsScreenBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      setOverflows(bottom > window.innerHeight);
    }
  }, []);

  return { overflows, ref };
};