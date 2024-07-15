import React, { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import TaskModal from "./TaskModal"
import TaskSection from "./TaskSection"
import EditSectionModal from "./EditSectionModal"
import api from '../../utils/axios'
import './dashboard.css'

function UserDashboard() {
    const [showModal, setShowModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [sections, setSections] = useState([])
    const [showEditingSectionModal, setShowEditingSectionModal] = useState(false)
    const [editingSection, setEditingSection] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [taskResponse, sectionResponse] = await Promise.all([
                    api.tasks.get('/getTasks'),
                    api.section.get('/getSection')
                ])

                setTasks(taskResponse.data)
                setSections(sectionResponse.data.map(section => ({ ...section, tasks: [] })))
            } catch (err) {
                console.error('Error fetching data:', err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setSections(prevSections => prevSections.map(section => {
            const sectionTasks = tasks.filter(task => task.sectionName === section.name)
            return { ...section, tasks: sectionTasks }
        }))
    }, [tasks])

    const handleAddTask = async (task) => {
        try {
            const response = await api.tasks.post('/createTask', task)
            setTasks(prevTasks => [...prevTasks, response.data.task])
        } catch (err) {
            console.error('Error adding task:', err)
        }
    }

    const handleAddSection = async (sectionName) => {
        try {
            const response = await api.section.post('/createSection', { name: sectionName })
            setSections(prevSections => [...prevSections, { ...response.data, tasks: [] }])
        } catch (err) {
            console.error('Error adding section:', err)
        }
    }

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData('task', JSON.stringify(task))
    }

    const handleDrop = async (e, sectionName) => {
        const task = JSON.parse(e.dataTransfer.getData('task'))
        try {
            await api.tasks.put(`/section/${task._id}`, { sectionName })
            setTasks(prevTasks => prevTasks.map(t => t._id === task._id ? { ...t, sectionName } : t))
        } catch (err) {
            console.error('Error updating task section:', err)
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            await api.tasks.delete(`/deleteTask/${taskId}`)
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId))
        } catch (err) {
            console.error('Error deleting task:', err)
        }
    }

    const handleEditSection = (section) => {
        setEditingSection(section)
        setShowEditingSectionModal(true)
    }

    const handleUpdateSection = async (sectionName) => {
        try {
            const response = await api.section.put(`/updateSection/${editingSection._id}`, { name: sectionName })
            setSections(sections.map(section => section._id === editingSection._id ? { ...section, name: response.data.section.name } : section))
            setShowEditingSectionModal(false)
            setEditingSection(null)
        } catch (err) {
            console.error('Error updating section:', err)
        }
    }

    const handleDeleteSection = async (sectionId) => {
        try {
            await api.section.delete(`/deleteSection/${sectionId}`)
            setSections(sections.filter(section => section._id !== sectionId))
            setTasks(prevTasks => prevTasks.map(task => task.sectionName === sectionId ? { ...task, sectionName: '' } : task))
        } catch (err) {
            console.error('Error deleting section:', err)
        }
    }

    return (
        <div className="dashboard-main">
            <Sidebar onAddSection={handleAddSection} />
            <div className="dashboard-content">
                <button onClick={() => setShowModal(true)}>Add Task</button>
                <div className="unsectioned-tasks">
                    {tasks.filter(task => !task.sectionName).map(task => (
                        <div key={task._id}
                             className="task-item"
                             draggable
                             onDragStart={(e) => handleDragStart(e, task)}
                        >
                            <h4>{task.name}</h4>
                            <p>{task.description}</p>
                            <p>Due: {task.dueDate}</p>
                            <p>Severity: {task.severity}</p>
                            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        </div>
                    ))}
                </div>
                {sections.map(section => (
                    <TaskSection 
                        key={section._id}
                        sectionName={section.name}
                        tasks={section.tasks}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onDeleteTask={handleDeleteTask}
                        onDeleteSection={() => handleDeleteSection(section._id)}
                        onEditSection={() => handleEditSection(section)}
                    />
                ))}
            </div>
            <TaskModal 
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddTask}
                sections={sections} 
            />
            <EditSectionModal 
                show={showEditingSectionModal}
                onClose={() => setShowEditingSectionModal(false)}
                onSubmit={handleUpdateSection}
                section={editingSection}
            />
        </div>
    )
}

export default UserDashboard