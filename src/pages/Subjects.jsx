import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';
import { Card, ProgressBar, Button } from '../components/ui/Components';
import { useApp } from '../context/AppContext';
import { calculateAttendanceStats, getAttendanceColor, getProgressColor, calculateProjections } from '../utils/calculations';

const Subjects = () => {
    const navigate = useNavigate();
    const { subjects, attendanceRecords, semesterData, user } = useApp();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subjects</h1>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate('/subjects/manage')}
                >
                    Manage
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {subjects.map(subject => {
                    const stats = calculateAttendanceStats(subject.id, attendanceRecords, subject.classesPerWeek, semesterData);
                    const target = subject.targetAttendance || user?.targetAttendance || 75;
                    const projection = calculateProjections(subject, stats, semesterData, target);

                    return (
                        <Card
                            key={subject.id}
                            className="active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md"
                            onClick={() => navigate(`/subject/${subject.id}`)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{subject.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{subject.code}</p>
                                </div>
                                <div className={`text-lg font-bold ${getAttendanceColor(stats.percentage, stats.isNoData)}`}>
                                    {stats.isNoData ? 'N/A' : `${stats.percentage}%`}
                                </div>
                            </div>

                            <ProgressBar
                                value={stats.isNoData ? 0 : stats.percentage}
                                className="mb-3"
                                colorClass={getProgressColor(stats.percentage, stats.isNoData)}
                            />

                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-600 dark:text-slate-400">
                                    {stats.present + stats.dutyLeave}/{stats.totalClassesConducted} Attended
                                </span>
                                <span className={`font-medium ${stats.isNoData ? 'text-slate-400' :
                                    projection.status === 'On Track' ? 'text-green-600 dark:text-green-400' :
                                        projection.status === 'Behind' ? 'text-red-600 dark:text-red-400' : 'text-slate-500'
                                    }`}>
                                    {stats.isNoData ? 'No classes yet' : projection.status}
                                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {subjects.length === 0 && (
                <div className="text-center py-10 text-slate-500">
                    No subjects found. Add some to get started!
                </div>
            )}
        </div>
    );
};

export default Subjects;
