import { useEffect, useState } from "react";
import { Store } from "../../Context/Context";

const Counter = ({ targetValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!targetValue || targetValue === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = parseInt(targetValue);
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue]);

  return <span>{count}</span>;
};

function TaskListNumber() {
  const currentUser = Store((state) => state.user);

  const stats = [
    {
      label: "New Tasks",
      count: currentUser?.taskCounts?.newTask || 0,
      color: "bg-blue-600",
      icon: "✨",
    },
    {
      label: "Completed",
      count: currentUser?.taskCounts?.completed || 0,
      color: "bg-emerald-600",
      icon: "🏆",
    },
    {
      label: "Accepted",
      count: currentUser?.taskCounts?.active || 0,
      color: "bg-amber-500",
      icon: "⚡",
    },
    {
      label: "Failed",
      count: currentUser?.taskCounts?.failed || 0,
      color: "bg-rose-600",
      icon: "⚠️",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 px-4 md:px-0 ">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.color} relative overflow-hidden group rounded-2xl p-6 h-36 flex flex-col justify-center transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-white/10`}
        >
          <span className="absolute -right-2  text-8xl opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none">
            {stat.icon}
          </span>

          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white tracking-tight">
              <Counter targetValue={stat.count} />
            </h2>
            <p className="text-white/90 font-bold uppercase tracking-[0.15em] text-[10px] md:text-xs mt-1">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskListNumber;
