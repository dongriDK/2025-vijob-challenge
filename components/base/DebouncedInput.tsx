import { forwardRef, useEffect, useRef, useState } from "react";

interface DebouncedInputProps extends React.ComponentProps<"input"> {
  debounceDelay?: number; // 디바운스 지연 시간 (ms)
  onDebouncedChange?: (value: string) => void;
  defaultValue?: string | number | undefined;
}

const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  (
    {
      debounceDelay = 300,
      onDebouncedChange,
      onChange,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState<string>(
      defaultValue?.toString() || ""
    );

    // 디바운스 타이머
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      // 로컬 상태 업데이트 (즉각 반영)
      setLocalValue(newValue);

      // 기존 타이머 제거
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 디바운스된 핸들러 호출
      debounceRef.current = setTimeout(() => {
        if (onDebouncedChange) {
          onDebouncedChange(newValue);
        }
      }, debounceDelay);

      // 즉각적인 onChange 이벤트 호출
      if (onChange) {
        onChange(event);
      }
    };

    useEffect(() => {
      if (defaultValue) {
        setLocalValue(defaultValue.toString());
      }
    }, [defaultValue]);

    // 타이머 정리
    useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);
    return (
      <input
        className={props.className}
        ref={ref}
        value={localValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

DebouncedInput.displayName = "DebouncedInput";

export { DebouncedInput };
