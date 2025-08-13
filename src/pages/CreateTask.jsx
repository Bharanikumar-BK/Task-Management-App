import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TaskForm from '../components/TaskForm';
import Alert from '../components/Alert';
import { useState } from 'react';

const CreateTask = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const handleSubmit = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setAlert({ type: 'success', message: 'Task created successfully!' });
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <TaskForm onSubmit={handleSubmit} buttonText="Create Task" />
    </div>
  );
};

export default CreateTask;