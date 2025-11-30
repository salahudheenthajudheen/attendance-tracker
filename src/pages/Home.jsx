import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Plus } from 'lucide-react';
import { Button } from '../components/ui/Components';
import TodaySchedule from '../components/dashboard/TodaySchedule';
import StatsSummary from '../components/dashboard/StatsSummary';
import { useApp } from '../context/AppContext';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useApp();
    const today = new Date();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hi, {user?.name?.split(' ')[0]}! 👋</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        {format(today, 'EEEE, d MMMM')}
                    </p>
                </div>
                <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                        Sem {user?.semester}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <StatsSummary />

            {/* Today's Schedule */}
            <TodaySchedule />

            {/* Quick Actions */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="secondary"
                        className="justify-start gap-2 h-auto py-3"
                        onClick={() => navigate('/subjects')}
                    >
                        <BookOpen size={18} />
                        <span className="text-left">
                            <span className="block text-sm font-semibold">All Subjects</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400 font-normal">View details</span>
                        </span>
                    </Button>

                    <Button
                        variant="secondary"
                        className="justify-start gap-2 h-auto py-3"
                        onClick={() => navigate('/timetable')}
                    >
                        <Calendar size={18} />
                        <span className="text-left">
                            <span className="block text-sm font-semibold">Timetable</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400 font-normal">Full schedule</span>
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
