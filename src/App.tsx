import Header from "@/components/header";
import ThemeToggle from "@/components/theme-toggle";
import TodoList from "@/components/todo-list";
import RunningRoutine from "@/components/running-routine";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 dark:from-cyan-700 dark:to-light-blue-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Header />
              <ThemeToggle />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RunningRoutine />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
