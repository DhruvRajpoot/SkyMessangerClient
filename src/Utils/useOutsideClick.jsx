import { useEffect, useRef } from "react";

const useOutsideClick = (
  ref,
  onOutsideClick,
  condition = true,
  excludeRefs = []
) => {
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

      if (
        condition &&
        !isExcluded &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        savedCallback.current();
      }
    };

    if (condition) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      if (condition) {
        document.removeEventListener("click", handleClick);
      }
    };
  }, [ref, condition, excludeRefs]);
};

export default useOutsideClick;
