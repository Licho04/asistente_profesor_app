import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Circle,
  LoaderCircle,
  Menu,
  Plus,
  X
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { WorkspaceSidebar } from '../../../components/layout/WorkspaceSidebar'
import { Button } from '../../../components/ui/Button'
import {
  activateAcademicPeriod,
  createAcademicPeriod,
  listAcademicPeriods,
  type AcademicPeriod
} from './academicPeriodService'

const DEMO_TEACHER_ID = 'demo-teacher-mariana-ruiz'

type LoadState = 'loading' | 'ready' | 'error'

const initialForm = {
  name: '',
  startDate: '',
  endDate: '',
  activate: true
}

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC'
})

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

export function AcademicPeriodsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [periods, setPeriods] = useState<AcademicPeriod[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [loadError, setLoadError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [activatingId, setActivatingId] = useState('')
  const [notice, setNotice] = useState('')

  const loadPeriods = useCallback(async () => {
    setLoadState('loading')
    setLoadError('')

    try {
      setPeriods(await listAcademicPeriods(DEMO_TEACHER_ID))
      setLoadState('ready')
    } catch {
      setLoadError('No se pudieron consultar los periodos guardados. Intente nuevamente.')
      setLoadState('error')
    }
  }, [])

  useEffect(() => {
    void loadPeriods()
  }, [loadPeriods])

  const activePeriods = useMemo(
    () => periods.filter((period) => period.status === 'active'),
    [periods]
  )

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3500)
  }

  const closeDialog = () => {
    if (saving) return
    setDialogOpen(false)
    setForm(initialForm)
    setFormError('')
  }

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setFormError('')

    try {
      const period = await createAcademicPeriod({
        teacherId: DEMO_TEACHER_ID,
        ...form
      })
      await loadPeriods()
      setDialogOpen(false)
      setForm(initialForm)
      showNotice(`Periodo “${period.name}” creado correctamente.`)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'No fue posible crear el periodo.')
    } finally {
      setSaving(false)
    }
  }

  const handleActivate = async (period: AcademicPeriod) => {
    setActivatingId(period.id)
    setLoadError('')

    try {
      await activateAcademicPeriod(DEMO_TEACHER_ID, period.id)
      await loadPeriods()
      showNotice(`El periodo “${period.name}” está activo.`)
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'No fue posible activar el periodo.')
    } finally {
      setActivatingId('')
    }
  }

  return (
    <div className="app-frame">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <WorkspaceSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {mobileNavOpen && (
        <button
          className="backdrop mobile-only"
          aria-label="Cerrar menú"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <main className="main" id="contenido">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNavOpen(true)} aria-label="Abrir menú">
            <Menu size={22} />
          </button>
          <Link to="/" className="back-link">
            <ArrowLeft size={17} /> Volver al inicio
          </Link>
          <div className="page-context">
            <span>Organización académica</span>
            <strong>{activePeriods.length === 1 ? activePeriods[0].name : `${activePeriods.length} periodos activos`}</strong>
          </div>
        </header>

        <div className="content academic-periods-page">
          <section className="academic-heading" aria-labelledby="periods-title">
            <div>
              <p className="eyebrow">HU-01 · ORGANIZACIÓN ACADÉMICA</p>
              <h1 id="periods-title">Periodos académicos</h1>
              <p>Cree y consulte los semestres que utilizará para organizar sus materias y grupos.</p>
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus size={18} /> Crear periodo
            </Button>
          </section>

          <aside className="local-data-note" aria-label="Estado del almacenamiento">
            <CalendarDays size={19} />
            <div>
              <strong>Guardado local durante la etapa inicial</strong>
              <span>Los periodos permanecen en este navegador mientras el equipo revisa el modelo de Supabase.</span>
            </div>
          </aside>

          <section className="panel periods-panel" aria-labelledby="period-list-title">
            <div className="panel-heading periods-panel__heading">
              <div>
                <p className="section-kicker">REGISTRO DEL PROFESOR</p>
                <h2 id="period-list-title">Periodos registrados</h2>
              </div>
              {loadState === 'ready' && periods.length > 0 && (
                <span className="result-count">{periods.length} {periods.length === 1 ? 'periodo' : 'periodos'}</span>
              )}
            </div>

            {loadError && (
              <div className="inline-message inline-message--error" role="alert">
                <span>{loadError}</span>
                {loadState === 'error' && <button onClick={() => void loadPeriods()}>Reintentar</button>}
              </div>
            )}

            {loadState === 'loading' ? (
              <div className="period-state" role="status">
                <LoaderCircle className="spin" size={25} />
                <strong>Consultando periodos</strong>
                <span>Estamos leyendo la información guardada.</span>
              </div>
            ) : loadState === 'ready' && periods.length === 0 ? (
              <div className="period-state period-state--empty">
                <CalendarDays size={34} />
                <strong>Aún no hay periodos académicos</strong>
                <span>Cree el primero para comenzar a organizar su carga académica.</span>
                <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                  <Plus size={17} /> Crear primer periodo
                </Button>
              </div>
            ) : loadState === 'ready' ? (
              <>
                <div className="period-table-wrap">
                  <table className="period-table">
                    <thead>
                      <tr>
                        <th>Periodo</th>
                        <th>Fechas</th>
                        <th>Estado</th>
                        <th><span className="sr-only">Acciones</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {periods.map((period) => (
                        <tr key={period.id}>
                          <td>
                            <strong>{period.name}</strong>
                            <span>Creado para Mariana Ruiz</span>
                          </td>
                          <td>{formatDate(period.startDate)} – {formatDate(period.endDate)}</td>
                          <td>
                            <span className={`status-badge status-badge--${period.status}`}>
                              {period.status === 'active' ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                              {period.status === 'active' ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td>
                            {period.status === 'inactive' ? (
                              <Button
                                size="small"
                                variant="secondary"
                                disabled={activatingId === period.id}
                                onClick={() => void handleActivate(period)}
                              >
                                {activatingId === period.id ? 'Activando…' : 'Activar'}
                              </Button>
                            ) : (
                              <span className="current-label">Disponible para trabajar</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="period-mobile-list">
                  {periods.map((period) => (
                    <article className="period-mobile-item" key={period.id}>
                      <div className="period-mobile-item__heading">
                        <div>
                          <strong>{period.name}</strong>
                          <span>{formatDate(period.startDate)} – {formatDate(period.endDate)}</span>
                        </div>
                        <span className={`status-badge status-badge--${period.status}`}>
                          {period.status === 'active' ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                          {period.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      {period.status === 'inactive' && (
                        <Button
                          size="small"
                          variant="secondary"
                          disabled={activatingId === period.id}
                          onClick={() => void handleActivate(period)}
                        >
                          {activatingId === period.id ? 'Activando…' : 'Activar periodo'}
                        </Button>
                      )}
                    </article>
                  ))}
                </div>
              </>
            ) : null}
          </section>
        </div>
      </main>

      {dialogOpen && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={closeDialog}>
          <section
            className="period-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-period-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <form onSubmit={(event) => void handleCreate(event)}>
              <div className="dialog-heading">
                <div>
                  <p className="section-kicker">NUEVO REGISTRO</p>
                  <h2 id="create-period-title">Crear periodo académico</h2>
                  <span>Defina el nombre y las fechas que identificarán el semestre.</span>
                </div>
                <button className="icon-control" onClick={closeDialog} aria-label="Cerrar" type="button" disabled={saving}>
                  <X size={20} />
                </button>
              </div>

              <div className="period-form">
                <label className="form-field form-field--full">
                  <span>Nombre del periodo</span>
                  <input
                    autoFocus
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Ej. Agosto 2026 – Enero 2027"
                  />
                  <small>Use un nombre que pueda reconocer al consultar semestres anteriores.</small>
                </label>

                <label className="form-field">
                  <span>Fecha de inicio</span>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
                  />
                </label>

                <label className="form-field">
                  <span>Fecha de fin</span>
                  <input
                    type="date"
                    required
                    min={form.startDate || undefined}
                    value={form.endDate}
                    onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))}
                  />
                </label>

                <label className="activation-option form-field--full">
                  <input
                    type="checkbox"
                    checked={form.activate}
                    onChange={(event) => setForm((current) => ({ ...current, activate: event.target.checked }))}
                  />
                  <span>
                    <strong>Activar al guardar</strong>
                    <small>El periodo quedará disponible para organizar materias y grupos.</small>
                  </span>
                </label>

                {formError && <div className="form-error form-field--full" role="alert">{formError}</div>}
              </div>

              <div className="dialog-footer">
                <span>Los campos marcados son obligatorios.</span>
                <div>
                  <Button variant="ghost" onClick={closeDialog} disabled={saving}>Cancelar</Button>
                  <Button type="submit" disabled={saving}>{saving ? 'Guardando…' : 'Crear periodo'}</Button>
                </div>
              </div>
            </form>
          </section>
        </div>
      )}

      <div className={`toast ${notice ? 'toast--visible' : ''}`} role="status" aria-live="polite">
        <CheckCircle2 size={18} /> {notice}
      </div>
    </div>
  )
}
