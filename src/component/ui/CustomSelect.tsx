import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";

interface CustomSelectProps<T extends string> {
  placeholder: string;
  value: T | "";
  options: readonly T[];
  onChange: (value: T) => void;
}

const CustomSelect = <T extends string>({
  placeholder,
  value,
  options,
  onChange,
}: CustomSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          updatePosition();
          setOpen((prev) => !prev);
        }}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-zinc-700 transition hover:border-teal-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
      >
        <span>{value || placeholder}</span>

        <MdKeyboardArrowDown
          size={20}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className="z-[9999] rounded-xl border border-slate-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-sm hover:bg-slate-100 dark:hover:bg-zinc-800"
              >
                <span className="dark:text-white">
                  {option}
                </span>

                {value === option && (
                  <MdCheck
                    size={18}
                    className="text-teal-600"
                  />
                )}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomSelect;