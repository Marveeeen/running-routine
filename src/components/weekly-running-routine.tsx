import React, { useState } from "react";
import { Calendar, Edit2, Save, X } from "lucide-react";
import { ROW_KEYS } from "@/constants";
import { RunDay } from "@/types";

const Th = ({ children }: { children: React.ReactNode }) => {
  return (
    <th className="py-2 px-3 text-left text-xs font-medium text-blue-800 dark:text-blue-200 uppercase tracking-wider">
      {children}
    </th>
  );
};

const Td = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className="py-2 px-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
      {children}
    </td>
  );
};

const TdWithInput = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <td className="py-2 px-3 whitespace-nowrap">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
      />
    </td>
  );
};

type Props = {
  weeklyRoutine: RunDay[];
  handleWeeklyRoutineChange: (modifiedWeeklyRoutine: RunDay[]) => void;
};

export default function WeeklyRunningRoutine({
  weeklyRoutine,
  handleWeeklyRoutineChange,
}: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedRun, setEditedRun] = useState<RunDay | null>(null);

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedRun(weeklyRoutine[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedRun(null);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editedRun) {
      const newRoutine = [...weeklyRoutine];
      newRoutine[editingIndex] = editedRun;
      handleWeeklyRoutineChange(newRoutine);
      setEditingIndex(null);
      setEditedRun(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedRun) {
      setEditedRun({ ...editedRun, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Weekly Running Routine</h3>
        <Calendar className="h-5 w-5" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-100 dark:bg-blue-900">
              <Th>Day</Th>
              <Th>Run</Th>
              <Th>Distance</Th>
              <Th>Duration</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {weeklyRoutine.map((day, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-blue-50 dark:bg-blue-900"
                    : "bg-white dark:bg-gray-800"
                }
              >
                <td className="py-2 px-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {day.day}
                </td>
                {editingIndex === index ? (
                  <>
                    {ROW_KEYS.map((keyName) => (
                      <TdWithInput
                        key={keyName}
                        name={keyName}
                        value={editedRun?.[keyName as keyof RunDay] || ""}
                        onChange={handleInputChange}
                      />
                    ))}
                    <Td>
                      <button
                        onClick={saveEdit}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </Td>
                  </>
                ) : (
                  <>
                    <Td>{day.run}</Td>
                    <Td>{day.distance}</Td>
                    <Td>{day.duration}</Td>
                    <Td>
                      <button
                        onClick={() => startEditing(index)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </Td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
