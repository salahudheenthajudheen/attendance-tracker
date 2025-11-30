import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Card, Button, ProgressBar } from '../components/ui/Components';
import { useApp } from '../context/AppContext';
import { calculateAttendanceStats, getAttendanceColor, getProgressColor, calculateProjections } from '../utils/calculations';

const SubjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { subjects, attendanceRecords, semesterData, user, addAttendanceRecord, deleteAttendanceRecord } = useApp();

    const subject = subjects.find(s => s.id === id);

    if (!subject) {
        return <div className="p-4">Subject not found</div>;
    }

    const stats = calculateAttendanceStats(subject.id, attendanceRecords, subject.classesPerWeek, semesterData);
    const target = subject.targetAttendance || user?.targetAttendance || 75;
    const projection = calculateProjections(subject, stats, semesterData, target);

    // Filter records for this subject and sort by date desc
    const history = attendanceRecords
        .filter(r => r.subjectId === id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDeleteRecord = (recordId) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            deleteAttendanceRecord(recordId);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 line-clamp-1">{subject.name}</h1>
                        <p className="text-sm text-slate-500">{subject.code}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/subjects/edit/${id}`)}
                >
                    <Edit2 size={18} />
                </Button>
            </div>

            {/* Main Stats Card */}
            <Card className="bg-slate-900 text-white border-none">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-slate-400 text-sm">Current Attendance</p>
                        <div className={`text-4xl font-bold mt-1 ${getAttendanceColor(stats.percentage)}`}>
                            {stats.percentage}%
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-sm">Target</p>
                        <p className="text-xl font-semibold">{target}%</p>
                    </div>
                </div>

                <ProgressBar
                    value={stats.percentage}
                    className="bg-slate-700 mb-4"
                    colorClass={getProgressColor(stats.percentage)}
                />

                <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-slate-200 mb-1">
                        {projection.status === 'On Track' ? '🎉 On Track' : '⚠️ Attention Needed'}
                    </p>
                    <p className="text-xs text-slate-400">
                        {projection.message}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-800 rounded p-2">
                        <div className="text-green-400 font-bold text-lg">{stats.present}</div>
                        <div className="text-[10px] text-slate-400 uppercase">Present</div>
                    </div>
                    <div className="bg-slate-800 rounded p-2">
                        <div className="text-red-400 font-bold text-lg">{stats.absent}</div>
                        <div className="text-[10px] text-slate-400 uppercase">Absent</div>
                    </div>
                    <div className="bg-slate-800 rounded p-2">
                        <div className="text-orange-400 font-bold text-lg">{stats.dutyLeave}</div>
                        <div className="text-[10px] text-slate-400 uppercase">Duty</div>
                    </div>
                </div>
            </Card>

            {/* Actions */}
            <Button
                className="w-full py-3 gap-2"
                onClick={() => navigate(`/subject/${id}/add`)}
            >
                <Plus size={18} />
                Add Attendance
            </Button>

            {/* History */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-800">History</h2>
                {history.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">No records yet.</p>
                ) : (
                    history.map(record => (
                        <Card key={record.id} className="flex justify-between items-center py-3 px-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-10 rounded-full ${record.status === 'present' ? 'bg-green-500' :
                                    record.status === 'absent' ? 'bg-red-500' : 'bg-orange-500'
                                    }`} />
                                <div>
                                    <p className="font-medium text-slate-900">
                                        {format(parseISO(record.date), 'MMMM d, yyyy')}
                                    </p>
                                    <p className="text-xs text-slate-500 capitalize">
                                        {format(parseISO(record.date), 'EEEE')} • {record.status.replace('_', ' ')}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-red-600"
                                onClick={() => handleDeleteRecord(record.id)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default SubjectDetail;
