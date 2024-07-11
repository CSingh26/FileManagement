import React, { useState, useEffect } from "react"
import './taskModal.css'

const EditSectionModal = ({ show, onClose, onSubmit, section }) => {
    const [sectionName, setSectionName] = useState('')

    useEffect(() => {
        if (section) {
            setSectionName(section.name)
        }
    }, [section])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(sectionName)
    }

    if (!show) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Section</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Section Name:
                        <input 
                            type="text"
                            value={sectionName}
                            onChange={(e) => setSectionName(e.target.value)}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default EditSectionModal