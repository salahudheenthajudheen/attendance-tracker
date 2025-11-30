import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Card, Button } from '../components/ui/Components';
import { useApp } from '../context/AppContext';

const AddAttendance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { subjects, addAttendanceRecord } = useApp();

    const subject = subjects.find(s => s.id === id);

    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [status, setStatus] = useState('present');

    if (!subject) return <div>Subject not found</div>;

    const handleSubmit = (e) => {
        e.preventDefault();
        addAttendanceRecord({
            subjectId: id,
            date,
            status
        });
        navigate(-1);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="text-xl font-bold text-slate-900">Add Attendance</h1>
            </div>

            <Card className="p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-1">{subject.name}</h2>
                <p className="text-slate-500 text-sm mb-6">{subject.code}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Date</label>
                        <input
                            type="date"
                            required
                            className="input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Status</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${status === 'present'
                                        ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                onClick={() => setStatus('present')}
                            >
                                Present
                            </button>
                            <button
                                type="button"
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${status === 'absent'
                                        ? 'bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                onClick={() => setStatus('absent')}
                            >
                                Absent
                            </button>
                            <button
                                type="button"
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${status === 'duty_leave'
                                        ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                onClick={() => setStatus('duty_leave')}
                            >
                                Duty Leave
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Save
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddAttendance;
