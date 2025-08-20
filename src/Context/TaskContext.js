import { create } from "zustand";
export const Store=create((set)=>({

}))



import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Initial Data ---
// This is the default data that will be loaded the very first time the app runs.
// After that, the data will be loaded from localStorage.
const initialEmployees = [
    {
        "id": 1,
        "firstName": "Saad",
        "email": "e@e.com",
        "password": "123",
        "taskCounts": { "active": 2, "newTask": 1, "completed": 1, "failed": 0 },
        "tasks": [
            { "id": 101, "active": true, "newTask": true, "completed": false, "failed": false, "taskTitle": "Update website", "taskDescription": "Revamp the homepage design", "taskDate": "2024-10-12", "category": "Design" },
            { "id": 102, "active": false, "newTask": false, "completed": true, "failed": false, "taskTitle": "Client meeting", "taskDescription": "Discuss project requirements", "taskDate": "2024-10-10", "category": "Meeting" },
            { "id": 103, "active": true, "newTask": false, "completed": false, "failed": false, "taskTitle": "Fix bugs", "taskDescription": "Resolve bugs reported in issue tracker", "taskDate": "2024-10-14", "category": "Development" }
        ]
    },
    {
        "id": 2,
        "firstName": "Maaz",
        "email": "employee2@example.com",
        "password": "123",
        "taskCounts": { "active": 1, "newTask": 0, "completed": 1, "failed": 0 },
        "tasks": [
            { "id": 201, "active": true, "newTask": false, "completed": false, "failed": false, "taskTitle": "Database optimization", "taskDescription": "Optimize queries for better performance", "taskDate": "2024-10-11", "category": "Database" },
            { "id": 202, "active": false, "newTask": false, "completed": true, "failed": false, "taskTitle": "Design new feature", "taskDescription": "Create mockups for the new feature", "taskDate": "2024-10-09", "category": "Design" }
        ]
    },
    // ... other employees
];

const initialAdmin = [{
    'id': 99,
    "email": "admin@example.com",
    "password": "123"
}];


// --- The Centralized Store ---
// We wrap our store definition in the `persist` middleware.
export const useAppStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      // All your application's data lives here.
      employees: initialEmployees,
      admins: initialAdmin,
      currentUser: null, // Will hold info about the logged-in user ('admin' or employee object)

      // --- ACTIONS ---
      // These are functions that modify the state.

      /**
       * Logs a user in by checking credentials against the stored data.
       * @param {string} email - The user's email.
       * @param {string} password - The user's password.
       * @returns {boolean} - True if login is successful, false otherwise.
       */
      login: (email, password) => {
        const { admins, employees } = get(); // Get current state

        // Check if the user is an admin
        const adminUser = admins.find(admin => admin.email === email && admin.password === password);
        if (adminUser) {
          set({ currentUser: { role: 'admin', ...adminUser } });
          return true;
        }

        // Check if the user is an employee
        const employeeUser = employees.find(emp => emp.email === email && emp.password === password);
        if (employeeUser) {
          set({ currentUser: { role: 'employee', ...employeeUser } });
          return true;
        }
        
        // If no user is found
        return false;
      },

      /**
       * Logs the current user out.
       */
      logout: () => {
        set({ currentUser: null });
      },

      /**
       * Adds a new employee to the list.
       * @param {object} newEmployee - The employee object to add.
       */
      addEmployee: (newEmployee) => {
        set(state => ({
          employees: [...state.employees, { ...newEmployee, id: Date.now() }] // Add employee with a unique ID
        }));
      },
      
      /**
        * Adds a new task for a specific employee.
        * @param {number} employeeId - The ID of the employee.
        * @param {object} newTask - The new task object to add.
      */
      addTask: (employeeId, newTask) => {
        set(state => ({
            employees: state.employees.map(emp => 
                emp.id === employeeId 
                ? { ...emp, tasks: [...emp.tasks, { ...newTask, id: Date.now() }] } 
                : emp
            )
        }));
      },
      // You can add more actions here to modify state, e.g., updateTask, deleteEmployee, etc.

    }),
    {
      // Configuration for the persist middleware
      name: 'task-management-storage', // Name for the item in localStorage
    }
  )
);
