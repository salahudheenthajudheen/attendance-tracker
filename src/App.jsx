import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Setup from './pages/Setup';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import SubjectDetail from './pages/SubjectDetail';
import AddAttendance from './pages/AddAttendance';
import Timetable from './pages/Timetable';
import Settings from './pages/Settings';
import ManageSubjects from './pages/ManageSubjects';
import SubjectForm from './pages/SubjectForm';

import NotificationScheduler from './components/NotificationScheduler';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { format } from 'date-fns';

function AppContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { timetable, addAttendanceRecord, subjects } = useApp();

  useEffect(() => {
    const action = searchParams.get('action');
    if (action) {
      const today = new Date();
      const dayName = format(today, 'EEEE');
      const dateStr = format(today, 'yyyy-MM-dd');
      const todaysClasses = timetable[dayName] || [];

      if (action === 'mark-yes') {
        todaysClasses.forEach(slot => {
          addAttendanceRecord({
            subjectId: slot.subjectId,
            date: dateStr,
            status: 'present'
          });
        });
        alert('Marked all classes as Present!');
      }
      // 'mark-no' just opens the app, so no specific logic needed other than clearing the param

      // Clear the query param to prevent re-triggering on reload
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate, timetable, addAttendanceRecord]);

  return (
    <Routes>
      <Route path="/setup" element={<Setup />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Home />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="subjects/manage" element={<ManageSubjects />} />
        <Route path="subjects/new" element={<SubjectForm />} />
        <Route path="subjects/edit/:id" element={<SubjectForm />} />
        <Route path="subject/:id" element={<SubjectDetail />} />
        <Route path="subject/:id/add" element={<AddAttendance />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <NotificationScheduler />
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
