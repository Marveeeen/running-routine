import { Calendar } from "lucide-react";
import { useState } from "react";

import { type RunDay } from "@/types";
import WeeklyRunningRoutine from "@/components/weekly-running-routine";
import initialWeeklyRoutine from "@/data";

const getTodayRun = (weeklyRoutine: RunDay[]) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[new Date().getDay()];

  const todayRun = weeklyRoutine.find((day) => day.day === today);

  return todayRun;
};

export default function RunningRoutine() {
  const [weeklyRoutine, setWeeklyRoutine] =
    useState<RunDay[]>(initialWeeklyRoutine);

  const todayRun = getTodayRun(weeklyRoutine);

  const handleWeeklyRoutineChange = (modifiedWeeklyRoutine: RunDay[]) => {
    setWeeklyRoutine(modifiedWeeklyRoutine);
  };

  return (
    <section className="mb-8 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Running Routine
      </h2>
      <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-medium text-blue-800 dark:text-blue-200">
            Today's Run
          </span>
          <Calendar className="text-blue-500 dark:text-blue-300" />
        </div>
        <p className="text-blue-700 dark:text-blue-300">
          {todayRun?.run ?? "--"}
        </p>
        <div className="mt-2 flex justify-between text-sm text-blue-600 dark:text-blue-400">
          <span>Distance: {todayRun?.distance ?? "--"}</span>
          <span>Duration: {todayRun?.duration ?? "--"}</span>
        </div>
      </div>
      <WeeklyRunningRoutine
        weeklyRoutine={weeklyRoutine}
        handleWeeklyRoutineChange={handleWeeklyRoutineChange}
      />
    </section>
  );
}
