import { useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const menuItems = [
  { id: 'inicio', label: 'Início', icon: '⌂' },
  { id: 'cadastros', label: 'Cadastros', icon: '＋' },
  { id: 'relatorios', label: 'Relatórios', icon: '▤' },
]

const footerItems = [
  { id: 'inicio', label: 'Início', icon: '⌂' },
  { id: 'cadastros', label: 'Cadastros', icon: '＋' },
  { id: 'ajuda', label: 'Ajuda', icon: '?' },
]

export default function App() {
  const [activePage, setActivePage] = useState('inicio')
  const [nome, setNome] = useState('')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const nomeLimpo = nome.trim()

    if (!nomeLimpo) {
      setFeedback({ type: 'error', message: 'Digite um nome antes de salvar.' })
      return
    }

    if (!isSupabaseConfigured) {
      setFeedback({
        type: 'warning',
        message: 'A interface está pronta. Configure as variáveis do Supabase para ativar a gravação.',
      })
      return
    }

    setSaving(true)
    setFeedback(null)

    const { error } = await supabase.from('nomes').insert({ nome: nomeLimpo })

    if (error) {
      setFeedback({ type: 'error', message: `Não foi possível salvar: ${error.message}` })
    } else {
      setNome('')
      setFeedback({ type: 'success', message: 'Nome salvo no Supabase com sucesso!' })
    }

    setSaving(false)
  }

  function navigate(page) {
    setActivePage(page)
    setFeedback(null)
  }

  const pageTitle = {
    inicio: 'Novo cadastro',
    cadastros: 'Cadastros',
    relatorios: 'Relatórios',
    ajuda: 'Ajuda',
  }[activePage]

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" onClick={() => navigate('inicio')}>
          <span className="brand-mark">OC</span>
          <span>Oficina<span className="brand-light">Conexão</span></span>
        </a>
        <div className="topbar-right">
          <span className={`connection-pill ${isSupabaseConfigured ? 'online' : 'offline'}`}>
            <span className="status-dot" />
            {isSupabaseConfigured ? 'Supabase configurado' : 'Modo de configuração'}
          </span>
          <div className="avatar" aria-label="Perfil de teste">LF</div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-caption">MENU PRINCIPAL</div>
          <nav aria-label="Menu lateral">
            {menuItems.map((item) => (
              <button
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                key={item.id}
                onClick={() => navigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {activePage === item.id && <span className="active-indicator" />}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-caption">AMBIENTE</div>
            <div className="environment-card">
              <span className="environment-icon">✳</span>
              <div><strong>Projeto de teste</strong><small>Ambiente de demonstração</small></div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="breadcrumb">Workspace <span>/</span> {pageTitle}</div>
          <div className="page-heading">
            <div>
              <p className="eyebrow">OFICINA CONEXÃO</p>
              <h1>{pageTitle}</h1>
              <p className="page-description">
                {activePage === 'inicio'
                  ? 'Preencha o campo abaixo para testar a conexão com o banco de dados.'
                  : 'Esta seção faz parte da navegação demonstrativa do aplicativo.'}
              </p>
            </div>
            <span className="test-tag">DEMO</span>
          </div>

          {activePage === 'inicio' ? (
            <section className="form-card">
              <div className="card-heading">
                <div className="card-icon">✎</div>
                <div><h2>Identificação</h2><p>Cadastro simples para teste de integração</p></div>
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  autoComplete="name"
                  maxLength={120}
                />
                <button className="submit-button" type="submit" disabled={saving}>
                  {saving ? 'Salvando...' : 'Salvar nome'}
                  {!saving && <span aria-hidden="true">→</span>}
                </button>
                {feedback && <p className={`feedback ${feedback.type}`} role="status">{feedback.message}</p>}
              </form>
              <div className="card-footnote"><span>ⓘ</span> Os dados serão enviados para a tabela <code>nomes</code> no Supabase.</div>
            </section>
          ) : (
            <section className="placeholder-card">
              <div className="placeholder-icon">{activePage === 'ajuda' ? '?' : '⌑'}</div>
              <h2>{pageTitle}</h2>
              <p>Área demonstrativa. A navegação está funcionando; este conteúdo será desenvolvido em uma próxima etapa.</p>
              <button className="text-button" onClick={() => navigate('inicio')}>Voltar ao início <span>→</span></button>
            </section>
          )}

          <div className="main-footer">Oficina Conexão <span>•</span> Aplicativo de demonstração</div>
        </main>
      </div>

      <footer className="bottom-nav">
        {footerItems.map((item) => (
          <button
            key={item.id}
            className={`footer-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </footer>
    </div>
  )
}
