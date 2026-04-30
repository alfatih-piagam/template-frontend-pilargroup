import { useEffect, useMemo, useState } from 'react'

import BackgroundMain from './components/template/BackgroundMain.jsx'
import Header from './components/template/Header.jsx'
import Sidebar from './components/template/Sidebar.jsx'

function getCurrentPath() {
  if (typeof window === 'undefined') {
    return '/dashboard'
  }

  return window.location.pathname === '/' ? '/dashboard' : window.location.pathname
}

const pageDetails = {
  '/dashboard': {
    title: 'Dashboard',
    eyebrow: 'Legal Operations',
    value: '24',
    detail: 'Tiket aktif yang sedang diproses oleh tim legal.',
  },
  '/tickets': {
    title: 'Tickets',
    eyebrow: 'Ticket Queue',
    value: '12',
    detail: 'Permintaan baru yang menunggu review awal.',
  },
  '/documents': {
    title: 'Documents',
    eyebrow: 'Document Control',
    value: '8',
    detail: 'Dokumen legal yang membutuhkan validasi.',
  },
  '/users': {
    title: 'Users',
    eyebrow: 'Access Control',
    value: '16',
    detail: 'User internal dengan akses ke dashboard legal.',
  },
  '/settings': {
    title: 'Settings',
    eyebrow: 'Workspace',
    value: '5',
    detail: 'Konfigurasi utama untuk alur kerja legal.',
  },
  '/login': {
    title: 'Login',
    eyebrow: 'Session',
    value: '0',
    detail: 'Sesi pengguna sudah diarahkan keluar dari aplikasi.',
  },
}

function App() {
  const [activePath, setActivePath] = useState(getCurrentPath)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [lastUpdated, setLastUpdated] = useState(() => new Date())

  useEffect(() => {
    const handleRouteChange = () => {
      setActivePath(getCurrentPath())
    }

    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const activePage = pageDetails[activePath] ?? pageDetails['/dashboard']

  const overviewCards = useMemo(
    () => [
      activePage,
      {
        title: 'SLA Review',
        eyebrow: 'Performance',
        value: '92%',
        detail: 'Permintaan yang selesai sebelum batas SLA.',
      },
      {
        title: 'Priority',
        eyebrow: 'Escalation',
        value: '3',
        detail: 'Tiket prioritas tinggi yang perlu ditindaklanjuti.',
      },
    ],
    [activePage],
  )

  const shellClassName = [
    'dashboard-shell',
    sidebarCollapsed ? 'dashboard-shell--sidebar-collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={shellClassName}>
      <BackgroundMain />

      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        activePath={activePath}
        userName="Al Fatih"
        userRole="Legal Operations"
        onToggleCollapse={() => setSidebarCollapsed((currentValue) => !currentValue)}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <button
        type="button"
        className={`sidebar-overlay${mobileSidebarOpen ? ' active' : ''}`}
        aria-label="Close sidebar"
        onClick={() => setMobileSidebarOpen(false)}
      />

      <div className="dashboard-stage">
        <Header
          title="Nama Project"
          showMenuButton
          onMenuToggle={() => setMobileSidebarOpen(true)}
          breadcrumb={[
            { label: 'Ticketing Legal', href: '#' },
            { label: activePage.title, href: '#', active: true },
          ]}
          searchProps={{
            value: searchQuery,
            placeholder: 'Cari tiket...',
            ariaLabel: 'Cari tiket legal',
            onChange: (event) => setSearchQuery(event.target.value),
          }}
          notificationProps={{
            ariaLabel: 'Open notifications',
            modalTitle: 'Notifications',
          }}
          onRefresh={() => setLastUpdated(new Date())}
        />

        <main className="dashboard-main">
          <div className="dashboard-content">
            <section className="dashboard-overview" aria-label="Ringkasan dashboard">
              {overviewCards.map((card) => (
                <article className="dashboard-card" key={card.title}>
                  <div className="dashboard-card__meta">
                    <p className="dashboard-card__label">{card.eyebrow}</p>
                    <span className="dashboard-card__state">Active</span>
                  </div>
                  <strong className="dashboard-card__value">{card.value}</strong>
                  <p className="dashboard-card__detail">{card.detail}</p>
                </article>
              ))}
            </section>

            <section className="dashboard-grid" aria-label="Aktivitas legal">
              <article className="dashboard-panel">
                <div className="dashboard-panel__header">
                  <p className="dashboard-panel__eyebrow">Current View</p>
                  <h1 className="dashboard-panel__title">{activePage.title}</h1>
                </div>

                <div className="dashboard-stack">
                  <div className="dashboard-stack__item">
                    <h2 className="dashboard-stack__title">Review kontrak vendor</h2>
                    <p className="dashboard-stack__text">
                      Draft kontrak sedang masuk tahap pengecekan klausul komersial.
                    </p>
                  </div>
                  <div className="dashboard-stack__item">
                    <h2 className="dashboard-stack__title">Permintaan legal opinion</h2>
                    <p className="dashboard-stack__text">
                      Tim bisnis meminta analisis risiko untuk kerja sama baru.
                    </p>
                  </div>
                  <div className="dashboard-stack__item">
                    <h2 className="dashboard-stack__title">Pembaharuan dokumen</h2>
                    <p className="dashboard-stack__text">
                      Template dokumen internal sedang disesuaikan dengan kebijakan terbaru.
                    </p>
                  </div>
                </div>
              </article>

              <aside className="dashboard-panel">
                <div className="dashboard-panel__header">
                  <p className="dashboard-panel__eyebrow">Workspace</p>
                  <h2 className="dashboard-panel__title">Status</h2>
                </div>

                <ul className="dashboard-list">
                  <li className="dashboard-list__item">
                    Search: {searchQuery || 'Belum ada kata kunci'}
                  </li>
                  <li className="dashboard-list__item">
                    Path aktif: {activePath}
                  </li>
                  <li className="dashboard-list__item">
                    Update terakhir: {lastUpdated.toLocaleTimeString('id-ID')}
                  </li>
                </ul>
              </aside>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
