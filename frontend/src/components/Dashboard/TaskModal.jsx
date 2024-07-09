import React, { useState } from "react"
import './taskModal.css'

const TaskModal =({ show, onClose, onSubmit}) => {
    const [formData, setFormData] = useState({
        name: '',
        dueDate: '',
        description: '',
        severity: '',
        projectName: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    if (!show) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Task</h2>
                <form onSubmit={{handleSubmit}}>
                    <label> 
                        Task Name:
                        <input 
                        type="text"
                        name='name'
                        value={formData.name}
                        onChange={handleChange} 
                        />
                    </label>
                    <label> 
                        Due Date:
                        <input 
                        type="date"
                        name='dueDate'
                        value={formData.dueDate}
                        onChange={handleChange} 
                        />
                    </label>
                    <label> 
                        Description:
                        <textarea 
                        name='description'
                        value={formData.dueDate}
                        onChange={handleChange} 
                        />
                    </label>
                    <label> 
                        Severity:
                        <input 
                        type="number"
                        name='severity'
                        min='1'
                        max='5'
                        value={formData.severity}
                        onChange={handleChange} 
                        />
                    </label>
                    <label> 
                        Project Name:
                        <input 
                        type="text"
                        name='projectName'
                        value={formData.projectName}
                        onChange={handleChange} 
                        />
                    </label>
                    <button type="submit">Add Task</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default TaskModal