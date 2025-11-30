import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, Button } from '../components/ui/Components';
import { useApp } from '../context/AppContext';

const ManageSubjects = () => {
    const navigate = useNavigate();
    const { subjects, deleteSubject } = useApp();

    const handleDelete = (id) => {
        if (window.confirm('Are you sure? This will hide the subject from your dashboard.')) {
            deleteSubject(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-2xl font-bold text-slate-900">Manage Subjects</h1>
                </div>
                <Button size="sm" onClick={() => navigate('/subjects/new')}>
                    <Plus size={18} className="mr-1" /> Add
                </Button>
            </div>

            <div className="space-y-3">
                {subjects.map(subject => (
                    <Card key={subject.id} className="flex justify-between items-center p-4">
                        <div>
                            <h3 className="font-semibold text-slate-900">{subject.name}</h3>
                            <p className="text-sm text-slate-500">{subject.code} • {subject.classesPerWeek} classes/week</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:bg-blue-50"
                                onClick={() => navigate(`/subjects/edit/${subject.id}`)}
                            >
                                <Edit2 size={18} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleDelete(subject.id)}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ManageSubjects;
