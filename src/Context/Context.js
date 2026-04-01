import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialEmployeesData = [
  {
    id: 1,
    adminId: 101,
    firstName: "Saad",
    email: "employee1@example.com",
    password: "123",
    taskCounts: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        taskId: 1001,
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Update website",
        taskDescription: "Revamp the homepage design",
        taskDate: "2024-10-12",
        category: "Design",
      },
      {
        taskId: 1002,
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Client meeting",
        taskDescription: "Discuss project requirements",
        taskDate: "2024-10-10",
        category: "Meeting",
      },
      {
        taskId: 1003,
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fix bugs",
        taskDescription: "Resolve bugs reported in issue tracker",
        taskDate: "2024-10-14",
        category: "Development",
      },
    ],
  },
];

const initialAdminData = [
  { id: 101, email: "admin@example.com", password: "123" },
  { id: 102, email: "My@example.com", password: "123" },
];

const syncUser = (state, newEmployeesData) => {
  if (!state.user || state.user.role === "admin") return state.user;
  const fresh = newEmployeesData.find((e) => e.id === state.user.id);
  if (!fresh) return state.user;
  return { ...fresh, role: "employee" };
};

export const Store = create(
  persist(
    (set, get) => ({
      employeesData: initialEmployeesData,
      adminData: initialAdminData,
      user: null,

      login: (email, password, role) => {
        const { adminData, employeesData } = get();

        if (role === "admin") {
          const found = adminData.find(
            (a) => a.email === email && a.password === password,
          );
          if (found) {
            set({ user: { role: "admin", ...found } });
            return true;
          }
        } else if (role === "employee") {
          const found = employeesData.find(
            (e) => e.email === email && e.password === password,
          );
          if (found) {
            set({ user: { role: "employee", ...found } });
            return true;
          }
        }
        return false;
      },

      logout: () => set({ user: null }),

      addEmployee: (employeeName, employeeEmail, employeePassword) => {
        const { employeesData, user } = get();

        const nameTaken = employeesData.find(
          (e) => e.firstName.toLowerCase() === employeeName.toLowerCase(),
        );
        if (nameTaken) {
          return {
            success: false,
            message: `Employee name '${employeeName}' already exists.`,
          };
        }

        const emailTaken = employeesData.find(
          (e) => e.email.toLowerCase() === employeeEmail.toLowerCase(),
        );
        if (emailTaken) {
          return {
            success: false,
            message: `Email '${employeeEmail}' is already in use.`,
          };
        }

        set((state) => ({
          employeesData: [
            ...state.employeesData,
            {
              id: Date.now() % 1000000,
              adminId: user.id,
              firstName: employeeName,
              email: employeeEmail,
              password: employeePassword,
              taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 },
              tasks: [],
            },
          ],
        }));

        return {
          success: true,
          message: `Employee '${employeeName}' added successfully!`,
        };
      },

      addTask: (employeeId, taskData) =>
        set((state) => {
          const newTask = { ...taskData, taskId: Date.now() };

          const newEmployeesData = state.employeesData.map((employee) => {
            if (employee.id === employeeId) {
              return {
                ...employee,
                taskCounts: {
                  ...employee.taskCounts,
                  newTask: employee.taskCounts.newTask + 1,
                },
                tasks: [...employee.tasks, newTask],
              };
            }
            return employee;
          });

          return {
            employeesData: newEmployeesData,
            user: syncUser(state, newEmployeesData),
          };
        }),

      acceptTask: (taskId) =>
        set((state) => {
          const newEmployeesData = state.employeesData.map((employee) => {
            if (employee.id !== state.user?.id) return employee;
            return {
              ...employee,
              taskCounts: {
                ...employee.taskCounts,
                newTask: Math.max(0, employee.taskCounts.newTask - 1),
                active: employee.taskCounts.active + 1,
              },
              tasks: employee.tasks.map((t) =>
                t.taskId === taskId
                  ? { ...t, newTask: false, active: true }
                  : t,
              ),
            };
          });
          return {
            employeesData: newEmployeesData,
            user: syncUser(state, newEmployeesData),
          };
        }),

      completedTask: (taskId) =>
        set((state) => {
          const newEmployeesData = state.employeesData.map((employee) => {
            if (employee.id !== state.user?.id) return employee;
            return {
              ...employee,
              taskCounts: {
                ...employee.taskCounts,
                active: Math.max(0, employee.taskCounts.active - 1),
                completed: employee.taskCounts.completed + 1,
              },
              tasks: employee.tasks.map((t) =>
                t.taskId === taskId
                  ? { ...t, active: false, completed: true }
                  : t,
              ),
            };
          });
          return {
            employeesData: newEmployeesData,
            user: syncUser(state, newEmployeesData),
          };
        }),

      failedTask: (taskId) =>
        set((state) => {
          const newEmployeesData = state.employeesData.map((employee) => {
            if (employee.id !== state.user?.id) return employee;
            return {
              ...employee,
              taskCounts: {
                ...employee.taskCounts,
                active: Math.max(0, employee.taskCounts.active - 1),
                failed: employee.taskCounts.failed + 1,
              },
              tasks: employee.tasks.map((t) =>
                t.taskId === taskId ? { ...t, active: false, failed: true } : t,
              ),
            };
          });
          return {
            employeesData: newEmployeesData,
            user: syncUser(state, newEmployeesData),
          };
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export const useAdminEmployees = () => {
  const employeesData = Store((state) => state.employeesData);
  const user = Store((state) => state.user);

  if (user && user.role === "admin") {
    return employeesData.filter((e) => e.adminId === user.id);
  }
  return [];
};
