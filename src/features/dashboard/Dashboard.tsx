import { useState } from 'react'
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  UsersRound,
  X
} from 'lucide-react'
import { Button } from '../../components/ui/Button'

type AttendanceStatus = 'Asistió' | 'Retardo' | 'No asistió'

const classes = [
  {
    time: '10:00',
    end: '11:00',
    code: 'DACS-CC-401',
    title: 'Ingeniería de software',
    group: '4.º A · Aula C-12',
    tone: 'rust'
  },
  {
    time: '12:00',
    end: '13:30',
    code: 'DACS-CC-602',
    title: 'Bases de datos',
    group: '6.º B · Laboratorio 3',
    tone: 'teal'
  },
  {
    time: '16:00',
    end: '17:00',
    code: 'DACS-CC-205',
    title: 'Programación orientada a objetos',
    group: '2.º A · Aula C-08',
    tone: 'gold'
  }
]

const initialStudents: Array<{ name: string; id: string; status: AttendanceStatus }> = [
  { name: 'Ana Sofía Pérez', id: '242A1101', status: 'Asistió' },
  { name: 'Diego Hernández', id: '242A1108', status: 'Asistió' },
  { name: 'Fernanda López', id: '242A1114', status: 'Retardo' }
]

const navItems = [
  { label: 'Inicio', icon: LayoutDashboard, active: true },
  { label: 'Materias y grupos', icon: BookOpen },
  { label: 'Asistencia', icon: ClipboardCheck },
  { label: 'Calificaciones', icon: GraduationCap },
  { label: 'Planeación', icon: CalendarDays },
  { label: 'Mis materiales', icon: FileText }
]

export function Dashboard() {
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [students, setStudents] = useState(initialStudents)
  const [notice, setNotice] = useState('')

  const updateAttendance = (id: string, status: AttendanceStatus) => {
    setStudents((current) =>
      current.map((student) => (student.id === id ? { ...student, status } : student))
    )
  }

  const saveAttendance = () => {
    setAttendanceOpen(false)
    setNotice('Asistencia guardada para Ingeniería de software.')
    window.setTimeout(() => setNotice(''), 3500)
  }

  return (
    <div className="app-frame">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>

      <aside className={`sidebar ${mobileNavOpen ? 'sidebar--open' : ''}`} aria-label="Navegación principal">
        <div className="brand">
          <img src="/logo.svg" alt="" className="brand__mark" />
          <div>
            <strong>Aula Clara</strong>
            <span>Asistente docente</span>
          </div>
          <button className="sidebar__close" onClick={() => setMobileNavOpen(false)} aria-label="Cerrar menú">
            <X size={20} />
          </button>
        </div>

        <nav className="nav-list">
          <p className="nav-caption">ESPACIO DE TRABAJO</p>
          {navItems.map(({ label, icon: Icon, active }) => (
            <button key={label} className={`nav-item ${active ? 'nav-item--active' : ''}`}>
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="nav-item">
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

      {mobileNavOpen && <button className="backdrop mobile-only" aria-label="Cerrar menú" onClick={() => setMobileNavOpen(false)} />}

      <main className="main" id="contenido">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNavOpen(true)} aria-label="Abrir menú">
            <Menu size={22} />
          </button>
          <div className="period-selector">
            <span>Periodo actual</span>
            <select aria-label="Periodo académico">
              <option>Agosto 2026 – Enero 2027</option>
              <option>Febrero – Julio 2026</option>
            </select>
          </div>
          <div className="topbar__actions">
            <button className="icon-control" aria-label="Buscar"><Search size={20} /></button>
            <button className="icon-control notification" aria-label="Notificaciones">
              <Bell size={20} />
              <span className="notification__dot" />
            </button>
          </div>
        </header>

        <div className="content">
          <section className="welcome" aria-labelledby="welcome-title">
            <div>
              <p className="eyebrow">LUNES · 21 DE SEPTIEMBRE</p>
              <h1 id="welcome-title">Buen día, profesora Mariana.</h1>
              <p>Tiene tres clases y dos pendientes importantes para hoy.</p>
            </div>
            <Button onClick={() => setAttendanceOpen(true)}>
              <ClipboardCheck size={18} /> Registrar asistencia
            </Button>
          </section>

          <div className="dashboard-grid">
            <section className="panel schedule-panel" aria-labelledby="schedule-title">
              <div className="panel-heading">
                <div>
                  <p className="section-kicker">AGENDA DEL DÍA</p>
                  <h2 id="schedule-title">Sus clases de hoy</h2>
                </div>
                <button className="text-action">Ver semana <ChevronRight size={16} /></button>
              </div>

              <div className="class-list">
                {classes.map((item, index) => (
                  <article className="class-row" key={item.code}>
                    <div className="class-time">
                      <strong>{item.time}</strong>
                      <span>{item.end}</span>
                    </div>
                    <div className={`class-marker class-marker--${item.tone}`} />
                    <div className="class-info">
                      <span>{item.code}</span>
                      <h3>{item.title}</h3>
                      <p>{item.group}</p>
                    </div>
                    {index === 0 ? (
                      <Button size="small" variant="secondary" onClick={() => setAttendanceOpen(true)}>
                        Pasar lista
                      </Button>
                    ) : (
                      <button className="round-action" aria-label={`Abrir ${item.title}`}><ChevronRight size={18} /></button>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <aside className="side-column" aria-label="Resumen del día">
              <section className="next-class-card">
                <div className="next-class-card__top">
                  <span className="live-indicator"><i /> PRÓXIMA CLASE</span>
                  <span>en 24 min</span>
                </div>
                <p className="next-class-card__code">DACS-CC-401</p>
                <h2>Ingeniería de software</h2>
                <div className="next-class-card__meta">
                  <span><Clock3 size={16} /> 10:00 – 11:00</span>
                  <span><UsersRound size={16} /> 28 alumnos</span>
                </div>
                <div className="topic-note">
                  <span>Tema planeado</span>
                  <strong>Historias de usuario y criterios de aceptación</strong>
                </div>
                <Button onClick={() => setAttendanceOpen(true)}>Abrir sesión <ChevronRight size={17} /></Button>
              </section>

              <section className="panel pending-panel" aria-labelledby="pending-title">
                <div className="panel-heading panel-heading--compact">
                  <div>
                    <p className="section-kicker">PENDIENTES</p>
                    <h2 id="pending-title">Por atender</h2>
                  </div>
                  <button className="icon-control icon-control--small" aria-label="Agregar pendiente"><Plus size={18} /></button>
                </div>
                <ul className="pending-list">
                  <li>
                    <span className="task-check" />
                    <div><strong>Calificar avance de proyecto</strong><span>Ingeniería de software · Hoy</span></div>
                  </li>
                  <li>
                    <span className="task-check" />
                    <div><strong>Subir práctica de normalización</strong><span>Bases de datos · Mañana</span></div>
                  </li>
                </ul>
                <button className="text-action text-action--left">Ver todos los pendientes <ChevronRight size={16} /></button>
              </section>
            </aside>
          </div>

          <section className="summary-strip" aria-label="Resumen del periodo">
            <div><span>Grupos activos</span><strong>3</strong><small>87 alumnos en total</small></div>
            <div><span>Asistencia promedio</span><strong>91%</strong><small>+2% respecto al mes pasado</small></div>
            <div><span>Por calificar</span><strong>14</strong><small>Entregas de 2 actividades</small></div>
            <div><span>Materiales recientes</span><strong>8</strong><small>Agregados este periodo</small></div>
          </section>
        </div>
      </main>

      {attendanceOpen && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setAttendanceOpen(false)}>
          <section className="attendance-dialog" role="dialog" aria-modal="true" aria-labelledby="attendance-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="dialog-heading">
              <div>
                <p className="section-kicker">SESIÓN · 10:00–11:00</p>
                <h2 id="attendance-title">Ingeniería de software</h2>
                <span>4.º A · Aula C-12 · 21 de septiembre</span>
              </div>
              <button className="icon-control" onClick={() => setAttendanceOpen(false)} aria-label="Cerrar"><X size={20} /></button>
            </div>
            <div className="attendance-list">
              {students.map((student) => (
                <div className="student-row" key={student.id}>
                  <div className="student-avatar">{student.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</div>
                  <div className="student-info"><strong>{student.name}</strong><span>{student.id}</span></div>
                  <div className="status-options" role="group" aria-label={`Asistencia de ${student.name}`}>
                    {(['Asistió', 'Retardo', 'No asistió'] as AttendanceStatus[]).map((status) => (
                      <button key={status} className={student.status === status ? 'is-selected' : ''} onClick={() => updateAttendance(student.id, status)}>
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="dialog-footer">
              <span>Vista de referencia · 3 de 28 alumnos</span>
              <div>
                <Button variant="ghost" onClick={() => setAttendanceOpen(false)}>Cancelar</Button>
                <Button onClick={saveAttendance}>Guardar asistencia</Button>
              </div>
            </div>
          </section>
        </div>
      )}

      <div className={`toast ${notice ? 'toast--visible' : ''}`} role="status" aria-live="polite">
        <ClipboardCheck size={18} /> {notice}
      </div>
    </div>
  )
}

