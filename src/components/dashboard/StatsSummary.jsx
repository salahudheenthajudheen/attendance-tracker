import React from 'react';
import { PieChart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, ProgressBar } from '../ui/Components';
import { useApp } from '../../context/AppContext';
import { calculateAttendanceStats } from '../../utils/calculations';

const StatsSummary = () => {
    const { subjects, attendanceRecords, semesterData, user } = useApp();

    // Calculate overall stats
    let totalClasses = 0;
    let totalPresent = 0;
    let subjectsAtRisk = 0;

    subjects.forEach(subject => {
        const stats = calculateAttendanceStats(subject.id, attendanceRecords, subject.classesPerWeek, semesterData);
        totalClasses += stats.totalClassesConducted;
        totalPresent += (stats.present + stats.dutyLeave);

        // Use subject specific target or global fallback
        const target = subject.targetAttendance || user?.targetAttendance || 75;

        if (stats.percentage < target) {
            subjectsAtRisk++;
        }
    });

    const overallPercentage = totalClasses > 0
        ? ((totalPresent / totalClasses) * 100).toFixed(1)
        : 0;

    return (
        <div className="grid grid-cols-2 gap-4">
            <Card className="col-span-2 bg-blue-600 text-white border-none dark:bg-blue-700">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-blue-100">Overall Attendance</h3>
                    <PieChart size={20} className="text-blue-100" />
                </div>
                <div className="text-3xl font-bold mb-1">
                    {totalClasses > 0 ? `${overallPercentage}%` : 'No Data'}
                </div>
                <p className="text-sm text-blue-100 mb-3">Target: {user?.targetAttendance || 75}%</p>
                <ProgressBar
                    value={overallPercentage}
                    max={100}
                    className="bg-blue-800/50"
                    colorClass="bg-white"
                />
            </Card>

            <Card className="flex flex-col justify-center items-center p-3">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-2">
                    <AlertTriangle size={18} />
                </div>
                <span className="text-2xl font-bold text-slate-800 dark:text-white">{subjectsAtRisk}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center">Subjects at Risk</span>
            </Card>

            <Card className="flex flex-col justify-center items-center p-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-2">
                    <CheckCircle size={18} />
                </div>
                <span className="text-2xl font-bold text-slate-800 dark:text-white">{subjects.length - subjectsAtRisk}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center">On Track</span>
            </Card>
        </div>
    );
};

export default StatsSummary;
