import { useAdminEmployees } from "../../Context/Context";

const statCols = [
  { key: "newTask",   label: "New",      icon: "✨", badge: "bg-blue-500/20 text-blue-300 ring-blue-500/30"    },
  { key: "active",    label: "Active",   icon: "⚡", badge: "bg-amber-500/20 text-amber-300 ring-amber-500/30" },
  { key: "completed", label: "Done",     icon: "🏆", badge: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30" },
  { key: "failed",    label: "Failed",   icon: "⚠️", badge: "bg-rose-500/20 text-rose-300 ring-rose-500/30"   },
];

function EmployeeTaskDetails() {
  const employeesData = useAdminEmployees();

  if (employeesData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center select-none">
        <div className="text-6xl mb-4 opacity-50">👥</div>
        <p className="text-white/50 font-bold text-base">No employees yet</p>
        <p className="text-white/30 text-sm mt-1">Click "Add New Employee" to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
   
      <div className="min-w-[680px] flex items-center gap-4 px-5 py-2.5 mb-3 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[11px] font-bold uppercase tracking-widest">
        
        <span className="flex-1">Employee</span>
        {statCols.map((col) => (
          <span key={col.key} className="w-20 shrink-0 text-center">
            {col.icon} {col.label}
          </span>
        ))}
      </div>

      <div className="min-w-[680px] space-y-2">
        {employeesData.map((employee) => {
          const tc = employee.taskCounts || {};
       
         

          return (
            <div
              key={employee.id}
              className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.35] border border-white/[0.06] hover:border-white/20 transition-all duration-200 group"
            >
             
          
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-semibold text-sm truncate">
                    {employee.firstName}
                  </span>
                  <span className="text-white/25 text-[11px] font-mono">Id:{employee.id}</span>
                </div>
                
               
              </div>

          
              {statCols.map((col) => (
                <div key={col.key} className="w-20 shrink-0 flex justify-center">
                  <span
                    className={`inline-flex items-center justify-center w-9 h-7 rounded-lg text-sm font-bold ring-1 ${col.badge}`}
                  >
                    {tc[col.key] || 0}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EmployeeTaskDetails;