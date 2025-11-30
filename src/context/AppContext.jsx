import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SUBJECTS, INITIAL_TIMETABLE, INITIAL_SEMESTER_DATA } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // User Profile
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('at_user');
        return saved ? JSON.parse(saved) : null;
    });

    // Subjects
    const [subjects, setSubjects] = useState(() => {
        const saved = localStorage.getItem('at_subjects');
        return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
    });

    // Timetable
    const [timetable, setTimetable] = useState(() => {
        const saved = localStorage.getItem('at_timetable');
        return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
    });

    // Semester Data
    const [semesterData, setSemesterData] = useState(() => {
        const saved = localStorage.getItem('at_semester');
        return saved ? JSON.parse(saved) : INITIAL_SEMESTER_DATA;
    });

    // Attendance Records
    // Structure: [ { id, subjectId, date, status, timestamp } ]
    const [attendanceRecords, setAttendanceRecords] = useState(() => {
        const saved = localStorage.getItem('at_records');
        return saved ? JSON.parse(saved) : [];
    });

    // Persistence Effects
    useEffect(() => {
        if (user) localStorage.setItem('at_user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('at_subjects', JSON.stringify(subjects));
    }, [subjects]);

    useEffect(() => {
        localStorage.setItem('at_timetable', JSON.stringify(timetable));
    }, [timetable]);

    useEffect(() => {
        localStorage.setItem('at_semester', JSON.stringify(semesterData));
    }, [semesterData]);

    useEffect(() => {
        localStorage.setItem('at_records', JSON.stringify(attendanceRecords));
    }, [attendanceRecords]);

    // Actions
    const updateUser = (userData) => {
        setUser(prev => ({ ...prev, ...userData, setupComplete: true }));
    };

    const addAttendanceRecord = (record) => {
        setAttendanceRecords(prev => [...prev, { ...record, id: Date.now().toString(), timestamp: new Date().toISOString() }]);
    };

    const updateAttendanceRecord = (id, updatedData) => {
        setAttendanceRecords(prev => prev.map(r => r.id === id ? { ...r, ...updatedData } : r));
    };

    const deleteAttendanceRecord = (id) => {
        setAttendanceRecords(prev => prev.filter(r => r.id !== id));
    };

    const addSubject = (subject) => {
        setSubjects(prev => [...prev, { ...subject, id: Date.now().toString() }]);
    };

    const updateSubject = (id, data) => {
        setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    };

    const deleteSubject = (id) => {
        setSubjects(prev => prev.filter(s => s.id !== id));
        // Also cleanup records? Maybe keep them for history or delete?
        // Let's keep records but they won't show up if subject is gone.
    };

    const resetApp = () => {
        localStorage.clear();
        setUser(null);
        setSubjects(INITIAL_SUBJECTS);
        setTimetable(INITIAL_TIMETABLE);
        setSemesterData(INITIAL_SEMESTER_DATA);
        setAttendanceRecords([]);
        window.location.href = '/setup';
    };

    return (
        <AppContext.Provider value={{
            user,
            updateUser,
            subjects,
            addSubject,
            updateSubject,
            deleteSubject,
            timetable,
            setTimetable,
            semesterData,
            attendanceRecords,
            addAttendanceRecord,
            updateAttendanceRecord,
            deleteAttendanceRecord,
            resetApp
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
