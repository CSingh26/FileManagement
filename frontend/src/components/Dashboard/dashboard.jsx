import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import TaskModal from "./TaskModal"
import TaskSection from "./TaskSelection"
import api from '../../utils/axios'
import './dashboard.css'

function UserDashboard() {
    const [showModal, setShowModal] = useState(false);
    const[tasks, setTasks] = useState([]);
    const [sections, setSections] = useState([
        { name: 'Section 1', tasks: [] },
        { name: 'Section 2', tasks: [] }
    ]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.tasks.get('/getTasks');
                if (Array.isArray(response.data)) {
                    setTasks(response.data);
                } else {
                    console.error('Expected an array but got: ', response.data);
                }
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        setSections(prevSections => prevSections.map(section => {
            const sectionTasks = tasks.filter(task => task.sectionName === section.name);
            return { ...section, tasks: sectionTasks };
        }));
    }, [tasks]);

    const handleAddTask = (task) => {
        setTasks(prevTasks => {
            if (Array.isArray(prevTasks)) {
                return [...prevTasks, { ...task, id: prevTasks.length + 1 }];
            } else {
                console.error('Expected prevTasks to be an array but got:', prevTasks);
                return [{ ...task, id: 1 }];
            }
        });
    };

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData('task', JSON.stringify(task));
    };

    const handleDrop = (e, sectionName) => {
        const task = JSON.parse(e.dataTransfer.getData('task'));
        setSections(sections.map(section => {
            if (section.name === sectionName) {
                return {
                    ...section,
                    tasks: [...section.tasks, task]
                };
            }
            return section;
        }));
    };

    return (
        <div className="dashboard-main">
            <Sidebar />
            <div className="dashboard-content">
                <button onClick={() => setShowModal(true)}>Add Task</button>
                {sections.map(section => (
                    <TaskSection 
                        key={section.name}
                        sectionName={section.name}
                        tasks={section.tasks}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
            <TaskModal 
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddTask}
                sections={sections} 
            />
        </div>
    );
}

export default UserDashboard;
