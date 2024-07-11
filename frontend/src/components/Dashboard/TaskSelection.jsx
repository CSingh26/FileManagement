import React from "react";
import './taskSection.css';

const TaskSection = ({ sectionName, tasks, onDragStart, onDrop, onDeleteTask }) => {
    return (
        <div className="task-section">
            <h3>{sectionName}</h3>
            <div
                className="task-list"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, sectionName)}
            >
                {tasks.map(task => (
                    <div
                        key={task._id}
                        className="task-item"
                        draggable
                        onDragStart={(e) => onDragStart(e, task)}
                    >
                        <h4>{task.name}</h4>
                        <p>{task.description}</p>
                        <p>Due: {task.dueDate}</p>
                        <p>Severity: {task.severity}</p>
                        <button onClick={() => onDeleteTask(task._id)}>Delete</button>
                    </div>
                ))}    
            </div>
        </div>
    );
}

export default TaskSection;
