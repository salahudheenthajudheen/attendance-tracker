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

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
