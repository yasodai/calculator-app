import React from "react";
import { ThemeToggle, Calculator } from "./components";
import { clsx } from "./utils";

function App() {
  return (
    <div
      className={clsx(
        "w-screen h-screen px-6 py-8 flex justify-center items-center ",
        "blue:bg-blue-500 blue:text-white",
        "cyan:bg-gray-500 cyan:text-yellow-700",
        "violet:bg-violet-900 violet:text-yellow-400"
      )}
    >
      <main className="flex flex-col gap-8 w-screen max-w-xl">
        <header className="flex justify-between items-end">
          <h1 className="text-3xl font-bold">calc</h1>
          {/* ThemeToggle */}
          <ThemeToggle />
        </header>

        {/* Calculator */}
        <Calculator />
      </main>
    </div>
  );
}

export default App;
