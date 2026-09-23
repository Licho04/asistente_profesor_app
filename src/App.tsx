import { Navigate, Route, Routes } from 'react-router-dom'
import { AcademicPeriodsPage } from './features/academic/periods/AcademicPeriodsPage'
import { Dashboard } from './features/dashboard/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/academico/periodos" element={<AcademicPeriodsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
