import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, Button } from '../components/ui/Components';
import { useApp } from '../context/AppContext';

const SubjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { subjects, addSubject, updateSubject, user } = useApp();

    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        classesPerWeek: 3,
        color: 'bg-blue-500',
        targetAttendance: '' // Empty means use global default
    });

    useEffect(() => {
        if (isEdit) {
            const subject = subjects.find(s => s.id === id);
            if (subject) {
                setFormData(subject);
            }
        }
    }, [id, subjects, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            updateSubject(id, formData);
        } else {
            addSubject(formData);
        }
        navigate('/subjects/manage');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {isEdit ? 'Edit Subject' : 'Add New Subject'}
                </h1>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="input"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject Code</label>
                        <input
                            type="text"
                            name="code"
                            required
                            className="input"
                            value={formData.code}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Classes Per Week</label>
                        <input
                            type="number"
                            name="classesPerWeek"
                            required
                            min="1"
                            max="20"
                            className="input"
                            value={formData.classesPerWeek}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Target Attendance % (Optional)</label>
                        <input
                            type="number"
                            name="targetAttendance"
                            min="1"
                            max="100"
                            placeholder="Leave empty to use global default"
                            className="input"
                            value={formData.targetAttendance}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-slate-500">
                            Default is {user?.targetAttendance || 75}%
                        </p>
                    </div>

                    <Button type="submit" className="w-full mt-4">
                        Save Subject
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default SubjectForm;
