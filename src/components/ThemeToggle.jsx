import React, { useEffect, useState } from "react";
import { clsx } from "../utils";

const themes = [
  {
    label: "1",
    value: "theme-blue",
  },
  {
    label: "2",
    value: "theme-cyan",
  },
  {
    label: "3",
    value: "theme-violet",
  },
];

function Toggle({ style }) {
  return (
    <div
      className={clsx(
        "absolute w-4 h-4 pointer-events-none rounded-full",
        "duration-150",
        "blue:bg-red-500",
        "cyan:bg-orange-700",
        "violet:bg-cyan-500"
      )}
      style={style}
    ></div>
  );
}

export function ThemeToggle() {
  const [active, setActive] = useState("theme-blue");
  useEffect(() => {
    themes.forEach(({ value }) =>
      document.body.classList.toggle(value, value === active)
    );
  }, [active]);

  const index = themes.findIndex(({ value }) => value === active);

  return (
    <div
      onChangeCapture={(event) => setActive(event.target.value)}
      role="group"
      aria-labelledby="theme"
      className="flex items-end gap-4"
    >
      <span className="font-bold text-xs pb-1" id="theme">
        THEME
      </span>
      {/* switch */}
      <div>
        <div className="flex justify-around gap-1 px-1.5 ">
          {themes.map(({ label, value }) => (
            <label
              className="font-bold text-xs mb-0.5"
              key={value}
              htmlFor={value}
            >
              {label}
            </label>
          ))}
        </div>

        <div
          className={clsx(
            "flex items-center gap-1 p-1.5 rounded-full relative",
            "blue:bg-blue-700",
            "cyan:bg-red-700",
            "violet:bg-violet-800"
          )}
        >
          {themes.map(({ value }) => (
            <div key={value} className="w-4 flex justify-center items-center">
              <input
                type="radio"
                name="theme"
                id={value}
                value={value}
                className="opacity-0"
              />
            </div>
          ))}
          <Toggle
            style={{
              transform: `translateX(${index * 100}%)`,
              margin: `${index * 0.25}rem`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
