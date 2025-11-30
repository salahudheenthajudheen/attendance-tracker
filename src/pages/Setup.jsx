import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button, Card } from '../components/ui/Components';
import { CheckCircle2 } from 'lucide-react';

const Setup = () => {
    const navigate = useNavigate();
    const { updateUser } = useApp();

    const [formData, setFormData] = useState({
        name: '',
        batch: '',
        semester: '3', // Default
        department: '',
        rollNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.batch) return;

        updateUser({
            ...formData,
            targetAttendance: 75 // Default target
        });

        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 space-y-6">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome!</h1>
                    <p className="text-slate-500">Let's set up your profile to get started.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. John Doe"
                            className="input"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Batch/Year *</label>
                            <input
                                type="text"
                                name="batch"
                                required
                                placeholder="e.g. 2023-2027"
                                className="input"
                                value={formData.batch}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Semester *</label>
                            <select
                                name="semester"
                                required
                                className="input"
                                value={formData.semester}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                    <option key={sem} value={sem}>Sem {sem}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Department (Optional)</label>
                        <input
                            type="text"
                            name="department"
                            placeholder="e.g. Computer Science"
                            className="input"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Roll Number (Optional)</label>
                        <input
                            type="text"
                            name="rollNumber"
                            placeholder="e.g. CS21B001"
                            className="input"
                            value={formData.rollNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-6">
                        Get Started
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Setup;
