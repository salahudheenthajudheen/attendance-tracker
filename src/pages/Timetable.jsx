import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, Button } from '../components/ui/Components';
import { useApp } from '../context/AppContext';

const Timetable = () => {
    const navigate = useNavigate();
    const { timetable, subjects, user } = useApp();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const getSubject = (id) => subjects.find(s => s.id === id);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="text-2xl font-bold text-slate-900">Timetable</h1>
            </div>

            <div className="space-y-6">
                {days.map(day => {
                    const classes = timetable[day] || [];
                    if (classes.length === 0) return null;

                    return (
                        <div key={day} className="space-y-3">
                            <h2 className="font-semibold text-slate-800 sticky top-16 bg-slate-50 py-2 z-0">
                                {day}
                            </h2>
                            <div className="grid gap-3">
                                {classes.map((slot, idx) => {
                                    const subject = getSubject(slot.subjectId);
                                    return (
                                        <Card
                                            key={idx}
                                            className="flex gap-4 items-center cursor-pointer hover:bg-slate-50"
                                            onClick={() => subject && navigate(`/subject/${subject.id}`)}
                                        >
                                            <div className="w-16 text-xs font-medium text-slate-500 text-center bg-slate-100 rounded py-2">
                                                {slot.time.replace('-', '\n')}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-slate-900">
                                                    {subject ? subject.name : 'Unknown Subject'}
                                                </h3>
                                                <p className="text-sm text-slate-500">
                                                    {subject ? subject.code : slot.subjectId}
                                                </p>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timetable;
