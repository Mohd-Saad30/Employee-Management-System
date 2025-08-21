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
        taskTitle: "Update website",
        taskDescription: "Revamp the homepage design",
        taskDate: "2024-10-12",
        category: "Design",
      },
      {
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
  {
    id: 2,
    firstName: "Maaz",
    email: "employee2@example.com",
    password: "123",
    taskCounts: {
      active: 1,
      newTask: 0,
      completed: 1,
      failed: 0,
    },
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Database optimization",
        taskDescription: "Optimize queries for better performance",
        taskDate: "2024-10-11",
        category: "Database",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Design new feature",
        taskDescription: "Create mockups for the new feature",
        taskDate: "2024-10-09",
        category: "Design",
      },
    ],
  },
  {
    id: 3,
    firstName: "Rayyan",
    email: "employee3@example.com",
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
        taskTitle: "Prepare presentation",
        taskDescription: "Prepare slides for upcoming client presentation",
        taskDate: "2024-10-13",
        category: "Presentation",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Code review",
        taskDescription: "Review the codebase for optimization",
        taskDate: "2024-10-12",
        category: "Development",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Testing",
        taskDescription: "Test the latest build for bugs",
        taskDate: "2024-10-08",
        category: "QA",
      },
    ],
  },
  {
    id: 4,
    firstName: "Yamaan",
    email: "employee4@example.com",
    password: "123",
    taskCounts: {
      active: 1,
      newTask: 1,
      completed: 0,
      failed: 0,
    },
    tasks: [
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Write documentation",
        taskDescription: "Update the project documentation",
        taskDate: "2024-10-13",
        category: "Documentation",
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Set up CI/CD",
        taskDescription: "Implement continuous integration pipeline",
        taskDate: "2024-10-11",
        category: "DevOps",
      },
    ],
  },
  {
    id: 5,
    firstName: "Ibrahim",
    email: "employee5@example.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 1,
      completed: 1,
      failed: 1,
    },
    tasks: [
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "UI redesign",
        taskDescription: "Redesign the user interface for better UX",
        taskDate: "2024-10-14",
        category: "Design",
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Deploy new build",
        taskDescription: "Deploy the latest build to production",
        taskDate: "2024-10-09",
        category: "DevOps",
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Client feedback",
        taskDescription: "Gather feedback from clients after product launch",
        taskDate: "2024-10-12",
        category: "Support",
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
 
         addEmployee: (employeeName) => {
        const { employeesData } = get(); // Get current state
        const exists = employeesData.find(
          (employee) => employee.firstName.toLowerCase() === employeeName.toLowerCase()
        );
        
        if (exists) {
          return false; // Employee exists, return false immediately.
        }
        
        // If employee doesn't exist, update the state.
        set((state) => ({
          employeesData: [
            ...state.employeesData,
            {
              id: Date.now(),
              firstName: employeeName,
              email: `${employeeName.toLowerCase()}@example.com`,
              password: "123",
              taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 },
              tasks: [],
            },
          ],
        }));
        
        return true; // Return true to indicate success.
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
