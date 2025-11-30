import React, { useState } from 'react';
import { format, addDays, subDays, isSameDay, isAfter, startOfDay } from 'date-fns';
import { Check, X, Clock, AlertCircle, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, Button } from '../ui/Components';
import { useApp } from '../../context/AppContext';

const TodaySchedule = () => {
    const { timetable, subjects, attendanceRecords, addAttendanceRecord } = useApp();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const dayName = format(selectedDate, 'EEEE'); // "Monday"
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const isToday = isSameDay(selectedDate, new Date());
    const isFuture = isAfter(startOfDay(selectedDate), startOfDay(new Date()));

    const todaysClasses = timetable[dayName] || [];

    const getSubject = (id) => subjects.find(s => s.id === id);

    const getAttendanceStatus = (subjectId) => {
        return attendanceRecords.find(r =>
            r.subjectId === subjectId &&
            r.date === dateStr
        );
    };

    const handleMark = (subjectId, status) => {
        addAttendanceRecord({
            subjectId,
            date: dateStr,
            status,
        });
    };

    const navigateDay = (direction) => {
        setSelectedDate(prev => direction === 'next' ? addDays(prev, 1) : subDays(prev, 1));
    };

    const goToToday = () => setSelectedDate(new Date());

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <Clock size={20} className="text-blue-600" />
                    {isToday ? "Today's Schedule" : "Schedule"}
                </h2>

                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-1">
                    <button
                        onClick={() => navigateDay('prev')}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-xs font-medium w-24 text-center text-slate-700 dark:text-slate-300">
                        {isToday ? 'Today' : format(selectedDate, 'EEE, MMM d')}
                    </span>
                    <button
                        onClick={() => navigateDay('next')}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {todaysClasses.length === 0 ? (
                <Card className="text-center py-8">
                    <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="text-slate-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">No classes scheduled for {dayName}.</p>
                    {!isToday && (
                        <Button variant="ghost" size="sm" onClick={goToToday} className="mt-2 text-blue-600">
                            Go to Today
                        </Button>
                    )}
                </Card>
            ) : (
                <div className="space-y-3">
                    {todaysClasses.map((slot, index) => {
                        const subject = getSubject(slot.subjectId);
                        if (!subject) return null;

                        const record = getAttendanceStatus(slot.subjectId);
                        const isMarked = !!record;

                        return (
                            <Card key={`${slot.subjectId}-${index}`} className="flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                            {slot.time}
                                        </span>
                                        <h3 className="font-semibold text-slate-800 dark:text-white mt-1">{subject.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{subject.code}</p>
                                    </div>
                                    {isMarked && (
                                        <span className={`text-xs font-bold px-2 py-1 rounded capitalize
                      ${record.status === 'present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                record.status === 'absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                            {record.status.replace('_', ' ')}
                                        </span>
                                    )}
                                </div>

                                {!isMarked && !isFuture && (
                                    <div className="flex gap-2 mt-1">
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-1.5"
                                            onClick={() => handleMark(slot.subjectId, 'present')}
                                        >
                                            Present
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1.5"
                                            onClick={() => handleMark(slot.subjectId, 'absent')}
                                        >
                                            Absent
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs py-1.5"
                                            onClick={() => handleMark(slot.subjectId, 'duty_leave')}
                                        >
                                            Duty
                                        </Button>
                                    </div>
                                )}

                                {isFuture && (
                                    <div className="text-xs text-slate-400 italic text-center bg-slate-50 dark:bg-slate-800/50 py-1 rounded">
                                        Upcoming Class
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TodaySchedule;
