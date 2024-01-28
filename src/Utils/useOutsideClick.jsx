import { useEffect, useRef } from "react";

const useOutsideClick = (ref, onOutsideClick, excludeRefs = []) => {
  const savedCallback = useRef(onOutsideClick);

  useEffect(() => {
    savedCallback.current = onOutsideClick;
  }, [onOutsideClick]);

  useEffect(() => {
    const handleClick = (event) => {
      const isExcluded = excludeRefs.some(
        (excludeRef) =>
          excludeRef.current && excludeRef.current.contains(event.target)
      );

      if (!isExcluded && ref.current && !ref.current.contains(event.target)) {
        savedCallback.current();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, excludeRefs]);
};

export default useOutsideClick;
