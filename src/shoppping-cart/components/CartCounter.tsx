'use client'

import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";

import { increment, decrement, initCounterState } from "@/store/counter/CounterSlice";

interface CounterResponse {
  value: number;
  method: string;
}


const getAPIConuter = async (): Promise<CounterResponse> => {
  const response: CounterResponse = await fetch('/api/counter').then((res) => res.json());
  return response;
}


export function CartCounter() {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAPIConuter().then((data) => {
      if (!data) return;
      dispatch(initCounterState(data.value));
    });
  }, [dispatch]);

  return (
    <>
      <span className="text-4xl font-bold">{counter}</span>

      <div className="flex items-center justify-center mt-4 gap-2">
        <button
          onClick={() => dispatch( decrement() )}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
        >
          <span className="text-2xl font-bold">-1</span>
        </button>

        <button
          onClick={() => dispatch( increment() )}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
        >
          <span className="text-2xl font-bold">+1</span>
        </button>
      </div>
    </>
  );
}
