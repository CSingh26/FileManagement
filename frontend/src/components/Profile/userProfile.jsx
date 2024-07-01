import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/authContext"
import api from "../../utils/axios"
import { toast } from 'react-toastify'
import Header from "../Header/header"
import './profile.css'

function UserProfile() {
    const  { auth } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    const [isEditing, setIsEditing] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: ''
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const resposne = await api.profile.get('/')
                if (resposne.data) {
                    setProfile(resposne.data)
                    setFormData({
                        name: resposne.data.name,
                        age: resposne.data.age,
                        dateOfBirth: resposne.data.dateOfBirth
                    })
                }
            } catch (err) {
                console.log('Error Fetching profile', err)
            }
        } 
        fetchProfile()
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (profile) {
                await api.profile.put('/update', formData)
                toast.success('Profile updated successfuly', {
                    position: "top-center"
                })
            } else {
                await api.profile.post('/create', formData)
                toast.success('Profile created successfuly', {
                    position: "top-center"
                })
            }
            setProfile(profile)
            setIsEditing(false)
        } catch (err) {
            console.error('Error submitting profile', err)
            toast.error('Failed to submit profile', {
                position: "top-center"
            })
        }
    }
    return (
        <>
            <Header />
            <div className="profile-page">
                {profile && !isEditing ? (
                    <div className="profile-card">
                        <h2>{profile.name}</h2>
                        <p>Age: {profile.age}</p>
                        <p>Date of Birth: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                ) : (
                    <div className="profile-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Age:</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default UserProfile