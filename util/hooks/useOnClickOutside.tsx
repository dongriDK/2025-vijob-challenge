import { RefObject, useEffect } from "react";

interface UseOnClickOutsideProps {
  isOutSideClick?: boolean;
  ref: RefObject<HTMLElement>;
  handler: (event: MouseEvent | TouchEvent) => void;
}

export const useOnClickOutside = ({
  isOutSideClick = true,
  ref,
  handler,
}: UseOnClickOutsideProps) => {
  useEffect(() => {
    if (!isOutSideClick) return;
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref && (!ref.current || ref.current.contains(event.target as Node))) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, isOutSideClick]);
};
