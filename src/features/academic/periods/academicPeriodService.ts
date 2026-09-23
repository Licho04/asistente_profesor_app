export type AcademicPeriodStatus = 'active' | 'inactive'

export type AcademicPeriod = {
  id: string
  teacherId: string
  name: string
  startDate: string
  endDate: string
  status: AcademicPeriodStatus
  createdAt: string
  updatedAt: string
}

export type CreateAcademicPeriodInput = {
  teacherId: string
  name: string
  startDate: string
  endDate: string
  activate: boolean
}

const STORAGE_KEY = 'aula-clara:academic-periods:v1'

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, ' ').toLocaleLowerCase('es-MX')
}

function readPeriods(): AcademicPeriod[] {
  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return []
  }

  const parsed: unknown = JSON.parse(stored)

  if (!Array.isArray(parsed)) {
    throw new Error('No fue posible leer los periodos guardados en este dispositivo.')
  }

  return parsed as AcademicPeriod[]
}

function writePeriods(periods: AcademicPeriod[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(periods))
}

function ensureNoActiveDuplicate(
  periods: AcademicPeriod[],
  teacherId: string,
  name: string,
  ignoredPeriodId?: string
) {
  const duplicate = periods.some(
    (period) =>
      period.teacherId === teacherId &&
      period.status === 'active' &&
      period.id !== ignoredPeriodId &&
      normalizeName(period.name) === normalizeName(name)
  )

  if (duplicate) {
    throw new Error('Ya existe un periodo activo con este nombre para el profesor.')
  }
}

export async function listAcademicPeriods(teacherId: string) {
  return readPeriods()
    .filter((period) => period.teacherId === teacherId)
    .sort((first, second) => second.startDate.localeCompare(first.startDate))
}

export async function createAcademicPeriod(input: CreateAcademicPeriodInput) {
  const name = input.name.trim().replace(/\s+/g, ' ')

  if (!name) {
    throw new Error('Escriba un nombre para el periodo académico.')
  }

  if (!input.startDate || !input.endDate) {
    throw new Error('Seleccione la fecha de inicio y la fecha de fin.')
  }

  if (input.endDate < input.startDate) {
    throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio.')
  }

  const periods = readPeriods()

  if (input.activate) {
    ensureNoActiveDuplicate(periods, input.teacherId, name)
  }

  const now = new Date().toISOString()
  const period: AcademicPeriod = {
    id: crypto.randomUUID(),
    teacherId: input.teacherId,
    name,
    startDate: input.startDate,
    endDate: input.endDate,
    status: input.activate ? 'active' : 'inactive',
    createdAt: now,
    updatedAt: now
  }

  writePeriods([...periods, period])
  return period
}

export async function activateAcademicPeriod(teacherId: string, periodId: string) {
  const periods = readPeriods()
  const period = periods.find(
    (candidate) => candidate.id === periodId && candidate.teacherId === teacherId
  )

  if (!period) {
    throw new Error('El periodo académico ya no está disponible.')
  }

  ensureNoActiveDuplicate(periods, teacherId, period.name, period.id)

  const updatedPeriods = periods.map((candidate) =>
    candidate.id === period.id
      ? { ...candidate, status: 'active' as const, updatedAt: new Date().toISOString() }
      : candidate
  )

  writePeriods(updatedPeriods)
  return updatedPeriods.find((candidate) => candidate.id === period.id)!
}
