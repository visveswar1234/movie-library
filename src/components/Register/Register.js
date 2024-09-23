import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = ({ theme }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        gender: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateFormData()) return;

        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            toast.success('Registration successful');
            setTimeout(() => navigate('/login'), 2000); // Navigate to login page after registration
        })
        .catch(error => {
            toast.error('Registration failed due to: ' + error.message);
        });
    };

    const validateFormData = () => {
        const { username, password, confirmPassword, email, gender } = formData;

        if (!username.trim() || !password.trim() || !confirmPassword.trim() || !email.trim() || !gender.trim()) {
            toast.warning('Please fill in all fields');
            return false;
        }

        if (password !== confirmPassword) {
            toast.warning('Passwords do not match');
            return false;
        }

        return true;
    };

    return (
        <div className={`register-container ${theme}`}>
            <ToastContainer className="Toastify__toast-container--right" />
            <div className="register-card">
                <div className="register-header">
                    <h2>User Registration</h2>
                </div>
                <div className="register-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Name <span className="errmsg">*</span></label>
                            <input 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password <span className="errmsg">*</span></label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password <span className="errmsg">*</span></label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <br />
                            <input 
                                type="radio" 
                                name="gender" 
                                value="male" 
                                checked={formData.gender === 'male'} 
                                onChange={handleChange} 
                            />
                            <label>Male</label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="female" 
                                checked={formData.gender === 'female'} 
                                onChange={handleChange} 
                            />
                            <label>Female</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
                <div className="register-footer">
                    <span>Already have an account? </span>
                    <Link to="/login" className="btn btn-success">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
