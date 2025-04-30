import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tasks,setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  //charger les donne depuis le localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  //sauvegarder les donnees dans le localStorage
  useEffect(()=> {
    const handleResize = () =>
      { console.log('taille fenetre: ${window.innerWidth}px');

      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;

    setTasks([...tasks, {id: Date.now(),text: taskInput, completed: false}]);
    setTaskInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, completed: !task.completed} : task)
    );
  };
  return (
    <div>
      <h1>Ma todo List</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type='text'
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder='Ajouter une tache'/>
        <button type='submit' className='btn btn-primary'>Ajouter</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>

  

   
  );
}

export default App;
