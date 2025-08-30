import { create } from "zustand";
import { persist } from "zustand/middleware";
const employeesData = [
  {
    id: 1,
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
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Update website(DEMO DATA)",
        taskDescription: "Revamp the homepage design",
        taskDate: "2024-10-12",
        category: "Design",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Client meeting(DEMO DATA)",
        taskDescription: "Discuss project requirements",
        taskDate: "2024-10-10",
        category: "Meeting",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fix bugs(DEMO DATA)",
        taskDescription: "Resolve bugs reported in issue tracker",
        taskDate: "2024-10-14",
        category: "Development",
      },
    ],
  },
 
];

const adminData = [
  {
    id: 5,
    email: "admin@example.com",
    password: "123",
  },
];

export const Store = create(
  persist(
    (set, get) => ({
      employeesData: employeesData,
      adminData: adminData,
      user: null,
      login: (email, password) => {
        const { adminData, employeesData } = get();
        const adminUser = adminData.find(
          (admin) => admin.email == email && admin.password == password
        );
        if (adminUser) {
          set({ user: { role: "admin", ...adminUser } });
          return true;
        }
        const employeeUser = employeesData.find(
          (employee) => employee.email == email && employee.password == password
        );
        if (employeeUser) {
          set({ user: { role: "employee", ...employeeUser } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),

      addEmployee: (employeeName, employeeEmail, employeePassword) => {
        const { employeesData } = get();
        const existName = employeesData.find(
          (employee) =>
            employee.firstName.toLowerCase() === employeeName.toLowerCase()
        );
        if (existName) {
          return {
            success: false,
            message: `An employee named '${employeeName}' already exists.`,
          };
        }
        const existEmail = employeesData.find(
          (employee) =>
            employee.email.toLowerCase() === employeeEmail.toLowerCase()
        );
        if (existEmail) {
          return {
            success: false,
            message: `An employee email '${employeeEmail}' already exists.`,
          };
        }

        set((state) => ({
          employeesData: [
            ...state.employeesData,
            {
              id: Date.now(),
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
          message: `Employee '${employeeName}' was added successfully!`,
        };
      },

      acceptTask: (task) =>
        set((state) => ({
          user: {
            ...state.user,
            taskCounts: {
              ...state.user.taskCounts,
              newTask: state.user.taskCounts.newTask - 1,
              active: state.user.taskCounts.active + 1,
            },
            tasks: state.user.tasks.map((t) =>
              t.taskTitle === task.taskTitle
                ? { ...t, active: true, newTask: false }
                : t
            ),
          },

          employeesData: state.employeesData.map((employee) =>
            employee.id === state.user.id
              ? {
                  ...state.user,
                  taskCounts: {
                    ...state.user.taskCounts,
                    newTask: state.user.taskCounts.newTask - 1,
                    active: state.user.taskCounts.active + 1,
                  },
                  tasks: state.user.tasks.map((t) =>
                    t.taskTitle === task.taskTitle
                      ? { ...t, active: true, newTask: false }
                      : t
                  ),
                }
              : employee
          ),
        })),
      completedTask: (task) =>
        set((state) => ({
          user: {
            ...state.user,
            taskCounts: {
              ...state.user.taskCounts,
              completed: state.user.taskCounts.completed + 1,
              active: state.user.taskCounts.active - 1,
            },
            tasks: state.user.tasks.map((t) =>
              t.taskTitle === task.taskTitle
                ? { ...t, active: false, completed: true }
                : t
            ),
          },

          employeesData: state.employeesData.map((employee) =>
            employee.id === state.user.id
              ? {
                  ...state.user,
                  taskCounts: {
                    ...state.user.taskCounts,
                    completed: state.user.taskCounts.completed + 1,
                    active: state.user.taskCounts.active - 1,
                  },
                  tasks: state.user.tasks.map((t) =>
                    t.taskTitle === task.taskTitle
                      ? { ...t, active: false, completed: true }
                      : t
                  ),
                }
              : employee
          ),
        })),
      failedTask: (task) =>
        set((state) => ({
          user: {
            ...state.user,
            taskCounts: {
              ...state.user.taskCounts,
              failed: state.user.taskCounts.failed + 1,
              active: state.user.taskCounts.active - 1,
            },
            tasks: state.user.tasks.map((t) =>
              t.taskTitle === task.taskTitle
                ? { ...t, active: false, failed: true }
                : t
            ),
          },
          employeesData: state.employeesData.map((employee) =>
            employee.id === state.user.id
              ? {
                  ...state.user,
                  taskCounts: {
                    ...state.user.taskCounts,
                    failed: state.user.taskCounts.failed + 1,
                    active: state.user.taskCounts.active - 1,
                  },
                  tasks: state.user.tasks.map((t) =>
                    t.taskTitle === task.taskTitle
                      ? { ...t, active: false, failed: true }
                      : t
                  ),
                }
              : employee
          ),
        })),

      addTask: (employeeName, Task) =>
        set((state) => {
          let updatedUser = state.user;
          const newEmployeesData = state.employeesData.map((employee) => {
            if (employee.firstName === employeeName) {
              const updatedEmployee = {
                ...employee,
                taskCounts: {
                  ...employee.taskCounts,
                  newTask: employee.taskCounts.newTask + 1,
                },
                tasks: [...employee.tasks, Task],
              };
              if (state.user && state.user.id === employee.id) {
                updatedUser = updatedEmployee;
              }
              return updatedEmployee;
            }
            return employee;
          });
          return {
            employeesData: newEmployeesData,
            user: updatedUser,
          };
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
