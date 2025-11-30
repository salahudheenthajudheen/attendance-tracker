import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Trash2, Download } from 'lucide-react';
import { Card, Button } from '../components/ui/Components';
import { useApp } from '../context/AppContext';

const Settings = () => {
    const navigate = useNavigate();
    const { user, semesterData, resetApp, attendanceRecords, subjects, updateUser } = useApp();

    const handleExport = () => {
        const data = {
            user,
            subjects,
            attendanceRecords,
            semesterData,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleReset = () => {
        if (window.confirm('Are you sure? This will delete ALL your data permanently.')) {
            resetApp();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Button variant="ghost" className="p-2" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Profile</h2>
                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{user?.name}</h3>
                        <p className="text-sm text-slate-500">{user?.batch} • Sem {user?.semester}</p>
                    </div>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Attendance Goal</h2>
                <Card className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Target Percentage</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Minimum attendance you want to maintain</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                max="100"
                                className="input w-20 text-center"
                                value={user?.targetAttendance || 75}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (val > 0 && val <= 100) {
                                        // We need a way to update just the target without full profile form
                                        // Let's use the updateUser from context which merges data
                                        // We need to access updateUser here. 
                                        // Note: Settings component needs 'updateUser' from useApp()
                                        // I will add it to the destructuring below.
                                        // For now, assuming updateUser is available or I will add it.
                                    }
                                }}
                                onBlur={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (val > 0 && val <= 100) {
                                        updateUser({ targetAttendance: val });
                                    }
                                }}
                            />
                            <span className="font-bold text-slate-700 dark:text-slate-300">%</span>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Semester Info</h2>
                <Card className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Start Date</span>
                        <span className="font-medium">{semesterData.semesterStart}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">End Date</span>
                        <span className="font-medium">{semesterData.semesterEnd}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-2">Holidays ({semesterData.holidays.length})</p>
                        <div className="flex flex-wrap gap-2">
                            {semesterData.holidays.slice(0, 3).map((h, i) => (
                                <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                                    {h.name}
                                </span>
                            ))}
                            {semesterData.holidays.length > 3 && (
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                                    +{semesterData.holidays.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Data</h2>
                <div className="space-y-3">
                    <Button
                        variant="secondary"
                        className="w-full justify-start gap-3"
                        onClick={handleExport}
                    >
                        <Download size={18} />
                        Export Data
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={handleReset}
                    >
                        <Trash2 size={18} />
                        Reset App
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
