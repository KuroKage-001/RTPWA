import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard({ setAuth }) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const tasksData = response.data;
      setTasks(tasksData);
      
      setStats({
        total: tasksData.length,
        pending: tasksData.filter(t => t.status === 'pending').length,
        completed: tasksData.filter(t => t.status === 'completed').length
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingTasks = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <Navbar setAuth={setAuth} />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>⚾ Baseball Dashboard</h1>
          <p>Manage your training, games, and equipment</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        <div className="upcoming-section">
          <h2>Upcoming Tasks</h2>
          {loading ? (
            <p>Loading...</p>
          ) : upcomingTasks.length > 0 ? (
            <div className="task-list">
              {upcomingTasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-category">{getCategoryIcon(task.category)}</div>
                  <div className="task-details">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className="task-date">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                    </span>
                  </div>
                  <span className={`task-priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No upcoming tasks</p>
          )}
        </div>

        <button className="btn-view-all" onClick={() => navigate('/tasks')}>
          View All Tasks
        </button>
      </div>
    </div>
  );
}

function getCategoryIcon(category) {
  const icons = {
    training: '🏋️',
    game: '⚾',
    equipment: '🧤',
    team_meeting: '👥',
    other: '📌'
  };
  return icons[category] || icons.other;
}

export default Dashboard;
