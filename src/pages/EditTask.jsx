import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TaskForm from '../components/TaskForm';
import Alert from '../components/Alert';
import { useState, useEffect } from 'react';

const EditTask = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      navigate('/');
    }
  }, [id, tasks, navigate]);

  const handleSubmit = (updatedTask) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, ...updatedTask } : t
    );
    setTasks(updatedTasks);
    setAlert({ type: 'success', message: 'Task updated successfully!' });
    setTimeout(() => navigate('/'), 1500);
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <TaskForm
        initialValues={task}
        onSubmit={handleSubmit}
        buttonText="Update Task"
      />
    </div>
  );
};

export default EditTask;