import React, { createContext, useContext, useReducer, useRef, useState } from 'react';
import './index.css';

// SVG Icons as components (replacing lucide-react)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// Create Context
const TaskContext = createContext();

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.text }
            : task
        )
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    default:
      return state;
  }
};

// Task Provider Component
const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: 'all'
  });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use Task Context
const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

// Task Input Component
const TaskInput = () => {
  const { dispatch } = useTasks();
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const text = inputRef.current.value.trim();
    if (text) {
      dispatch({ type: 'ADD_TASK', payload: text });
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task..."
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
        >
          <PlusIcon />
          Add
        </button>
      </div>
    </div>
  );
};

// Filter Buttons Component
const FilterButtons = () => {
  const { state, dispatch } = useTasks();

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: filter.value })}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            state.filter === filter.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Task Item Component
const TaskItem = ({ task }) => {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }, 0);
  };

  const handleSave = () => {
    const newText = editInputRef.current.value.trim();
    if (newText && newText !== task.text) {
      dispatch({
        type: 'EDIT_TASK',
        payload: { id: task.id, text: newText }
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <button
        onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.completed && <CheckIcon />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            ref={editInputRef}
            type="text"
            defaultValue={task.text}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-1 border-2 border-blue-500 rounded focus:outline-none"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <CheckIcon />
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            <XIcon />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.text}
          </span>
          <button
            onClick={handleEdit}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
            title="Edit task"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
            title="Delete task"
          >
            <TrashIcon />
          </button>
        </>
      )}
    </div>
  );
};

// Task List Component
const TaskList = () => {
  const { state } = useTasks();

  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === 'active') return !task.completed;
    if (state.filter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">
          {state.tasks.length === 0
            ? 'No tasks yet. Add one to get started!'
            : 'No tasks match the current filter.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

// Task Stats Component
const TaskStats = () => {
  const { state } = useTasks();
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const active = total - completed;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
      <div className="flex justify-around text-center">
        <div>
          <div className="text-2xl font-bold text-gray-800">{total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-500">{active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-500">{completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
              Task Manager
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Organize your tasks efficiently
            </p>
            
            <TaskInput />
            <FilterButtons />
            <TaskList />
            <TaskStats />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;