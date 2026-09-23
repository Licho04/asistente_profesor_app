import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MoreHorizontal,
  Settings,
  X
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

type WorkspaceSidebarProps = {
  mobileOpen: boolean
  onClose: () => void
}

const navigation = [
  { label: 'Inicio', icon: LayoutDashboard, to: '/', end: true },
  { label: 'Materias y grupos', icon: BookOpen, to: '/academico/periodos' },
  { label: 'Asistencia', icon: ClipboardCheck },
  { label: 'Calificaciones', icon: GraduationCap },
  { label: 'Planeación', icon: CalendarDays },
  { label: 'Mis materiales', icon: FileText }
]

export function WorkspaceSidebar({ mobileOpen, onClose }: WorkspaceSidebarProps) {
  return (
    <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`} aria-label="Navegación principal">
      <div className="brand">
        <img src="/logo.svg" alt="" className="brand__mark" />
        <div>
          <strong>Aula Clara</strong>
          <span>Asistente docente</span>
        </div>
        <button className="sidebar__close" onClick={onClose} aria-label="Cerrar menú">
          <X size={20} />
        </button>
      </div>

      <nav className="nav-list">
        <p className="nav-caption">ESPACIO DE TRABAJO</p>
        {navigation.map(({ label, icon: Icon, to, end }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
              onClick={onClose}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ) : (
            <button key={label} className="nav-item nav-item--disabled" type="button" disabled>
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          )
        )}
      </nav>

      <div className="sidebar__footer">
        <button className="nav-item nav-item--disabled" type="button" disabled>
          <Settings size={19} strokeWidth={1.8} />
          <span>Configuración</span>
        </button>
        <div className="profile-mini">
          <div className="avatar">MR</div>
          <div>
            <strong>Mariana Ruiz</strong>
            <span>Profesora</span>
          </div>
          <MoreHorizontal size={18} />
        </div>
      </div>
    </aside>
  )
}
