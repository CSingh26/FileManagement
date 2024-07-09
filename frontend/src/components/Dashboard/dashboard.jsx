import React, { useState } from "react"
import Sidebar from "./Sidebar"
import TaskModal from "./TaskModal"
import TaskSection from "./TaskSelection"
import './dashboard.css'

function userDashboard() {
    const [showModal, setShowModal] = useState(false)
    const[tasks, setTasks] = useState([])
    const [sections, setSections] = useState([
        { name: 'Section 1', tasks: [] },
        { name: 'Section 2', tasks: [] }
    ])

    const handleAddTask = (task) => {
        setTasks([...tasks, { ...task, id: tasks.length + 1 }])
    }

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData('task', JSON.stringify(task))
    }

    const handleDrop = (e, sectionName) => {
        const task = JSON.parse(e.dataTransfer.getData('task'))
        setSections(sections.map(section => {
            if (section.name === sectionName) {
                section.tasks.push(task)
            }
            return section
        }))
    }
   return (
    <>
        <div className="dashboard-main">
            <Sidebar />
            <div className="dasbaord-content">
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
            />
        </div>
    </>
   )
}

export default userDashboard