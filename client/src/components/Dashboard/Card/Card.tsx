"use client";
import { ArrowDown, ArrowUp, Users } from "@phosphor-icons/react";

interface CardProps {
  item: {
    title: string;
    number: number;
    change: number;
  };
}

export default function Card({ item }: CardProps) {
  return (
    <div className="flex gap-4 w-full p-4 cursor-pointer hover:bg-slate-700 rounded-md bg-slate-800">
      <Users size={32} />
      <div className="flex flex-col gap-1">
        <h3 className="">{item.title}</h3>
        <p className="text-2xl font-semibold">{item.number}</p>
        <p>
          {item.change > 0 ? (
            <span className="flex items-center text-green-500">
              <ArrowUp />
              <span className="">{item.change}% so với tuần trước</span>
            </span>
          ) : (
            <span className="text-red-500 flex items-center">
              <ArrowDown />
              <span className="">{item.change}% so với tuần trước</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
