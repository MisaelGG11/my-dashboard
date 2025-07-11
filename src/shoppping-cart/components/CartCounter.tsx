'use client'

import { useState } from "react";

export function CartCounter({ value = 0 }: { value?: number }) {
  const [counter, setCounter] = useState<number>(value);

  return (
    <>
      <span className="text-4xl font-bold">{counter}</span>

      <div className="flex items-center justify-center mt-4 gap-2">
        <button
          onClick={() => setCounter((prev) => prev - 1)}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
        >
          <span className="text-2xl font-bold">-1</span>
        </button>

        <button
          onClick={() => setCounter((prev) => prev + 1)}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
        >
          <span className="text-2xl font-bold">+1</span>
        </button>
      </div>
    </>
  );
}
