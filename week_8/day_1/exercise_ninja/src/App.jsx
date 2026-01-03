import React, { createContext, useContext, useReducer, useState } from 'react';
import './App.css';

// Simple SVG Icons
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

// Action types
const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
  REMOVE_TASK: 'REMOVE_TASK'
};

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, {
        id: Date.now(),
        text: action.payload.text,
        completed: false
      }];
    
    case ACTIONS.TOGGLE_COMPLETE:
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
    
    case ACTIONS.REMOVE_TASK:
      return state.filter(task => task.id !== action.payload.id);
    
    default:
      return state;
  }
};

// Create Context
const TaskContext = createContext();

// Custom hook for using task context
const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

// Task Provider Component
const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = (text) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: { text } });
  };

  const toggleComplete = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_COMPLETE, payload: { id } });
  };

  const removeTask = (id) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: { id } });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Add Task Component
const AddTask = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = () => {
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="add-task-container">
      <div className="add-task-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task..."
          className="task-input"
        />
        <button
          onClick={handleSubmit}
          className="add-task-button"
        >
          <PlusIcon />
          Add
        </button>
      </div>
    </div>
  );
};

// Task Item Component
const TaskItem = ({ task }) => {
  const { toggleComplete, removeTask } = useTasks();

  return (
    <div className="task-item">
      <button
        onClick={() => toggleComplete(task.id)}
        className={`task-checkbox ${task.completed ? 'completed' : ''}`}
      >
        {task.completed && <CheckIcon />}
      </button>
      
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>
      
      <button
        onClick={() => removeTask(task.id)}
        className="task-delete-button"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

// Task List Component
const TaskList = () => {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-list-container">
      {activeTasks.length > 0 && (
        <div>
          <h3 className="task-section-title">
            Active Tasks ({activeTasks.length})
          </h3>
          <div className="tasks-group">
            {activeTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="task-section-title">
            Completed ({completedTasks.length})
          </h3>
          <div className="tasks-group">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Task Stats Component
const TaskStats = () => {
  const { tasks } = useTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="task-stats-grid">
      <div className="stat-card total">
        <div className="stat-number">{totalTasks}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-card active">
        <div className="stat-number">{activeTasks}</div>
        <div className="stat-label">Active</div>
      </div>
      <div className="stat-card completed">
        <div className="stat-number">{completedTasks}</div>
        <div className="stat-label">Completed</div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <TaskProvider>
      <div className="task-manager-container">
        <div className="task-manager-wrapper">
          <div className="task-manager-card">
            <h1 className="task-manager-title">Task Manager</h1>
            <p className="task-manager-subtitle">Manage your tasks </p>
            
            <TaskStats />
            <AddTask />
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}