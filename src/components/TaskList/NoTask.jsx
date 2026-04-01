function NoTask() {
  return (
    <div className="flex flex-col gap-5 h-[220px] w-[340px] bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 border border-slate-200 ">
      <div className="flex justify-between ">
        <span className="bg-green-500 text-white text-xs rounded-full font-bold px-3 py-1 ">
          NoTask
        </span>
        
      </div>

      <div className="flex flex-col  text-center mt-3 ">
        <h3 className="text-slate-800 font-semibold text-lg">All caught up!</h3>
        <p className="text-slate-500 text-sm">
          Your task list is empty. Take a break or start something new.
        </p>
      </div>
    </div>
  );
}

export default NoTask;
