import { useEffect, useState } from 'react'
import './App.css'

const vows = [
  {
    number: 'I',
    title: 'Смерть — это знание',
    text: 'Каждое поражение оставляет карту. Каждый враг однажды расскажет, где ошибся ты.',
    mark: 'MEMENTO MORI',
  },
  {
    number: 'II',
    title: 'Мир не ждёт тебя',
    text: 'Здесь нет маркеров, которые ведут за руку. Слушай тишину, читай руины, доверяй любопытству.',
    mark: 'NO GUIDING LIGHT',
  },
  {
    number: 'III',
    title: 'Сила заслужена',
    text: 'Не уровень делает тебя сильнее. Сильнее становится тот, кто вернулся после последнего удара.',
    mark: 'RISE AGAIN',
  },
]

const rituals = [
  {
    title: 'Мгла в долине',
    text: 'Туман скрывает дороги, но не исчезает даже у костра. В нём всегда слышно шаги тех, кто не вернулся.',
    tag: '01 / СЛЕДЫ',
  },
  {
    title: 'Пламя без имени',
    text: 'Огонь здесь не спасает и не прощает. Он только держит тебя в живых достаточно долго, чтобы сделать выбор.',
    tag: '02 / ОГОНЬ',
  },
  {
    title: 'Руны под землёй',
    text: 'Старые символы не предупреждают. Они лишь ждут, когда кто-то решится прочитать их собственную цену.',
    tag: '03 / ЗАКЛИНАНИЕ',
  },
]

function App() {
  const [activeVow, setActiveVow] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')
    const siblingIndexes = new Map()
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.16 },
        )
      : null

    const revealVisibleItems = () => {
      revealItems.forEach((item) => {
        const bounds = item.getBoundingClientRect()
        if (bounds.top < window.innerHeight * 0.95 && bounds.bottom > 0) {
          item.classList.add('is-visible')
          observer?.unobserve(item)
        }
      })
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    revealItems.forEach((item) => {
      const parent = item.parentElement
      const siblingIndex = siblingIndexes.get(parent) ?? 0
      item.style.setProperty('--reveal-delay', `${siblingIndex * 110}ms`)
      siblingIndexes.set(parent, siblingIndex + 1)
      observer?.observe(item)
    })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', revealVisibleItems, { passive: true })
    window.addEventListener('resize', revealVisibleItems)
    requestAnimationFrame(revealVisibleItems)

    return () => {
      observer?.disconnect()
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', revealVisibleItems)
      window.removeEventListener('resize', revealVisibleItems)
    }
  }, [])

  return (
    <>
      <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Пепел — на главную">
          <span className="wordmark-seal" aria-hidden="true">✳</span>
          <span>ПЕПЕЛ<span className="wordmark-period">.</span></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Основная навигация">
          <a href="#essence" onClick={() => setMenuOpen(false)}>Суть жанра</a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>Путь героя</a>
          <a href="#codex" onClick={() => setMenuOpen(false)}>Кодекс</a>
          <a href="games.html" onClick={() => setMenuOpen(false)}>Игры</a>
        </nav>
        <a className="header-link" href="#codex">
          Войти в бездну <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img
          className="hero-art"
          src="https://upload.wikimedia.org/wikipedia/commons/f/f5/K%C3%B6lner_Dom_von_der_Domplatte.jpg"
          alt="Кёльнский собор в мрачном свете"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="relic-sword relic-sword--home" aria-hidden="true">
          <span className="sword-crossguard" />
          <span className="sword-grip" />
          <span className="sword-pommel" />
        </div>
        <div className="relic-sword relic-sword--home-broken" aria-hidden="true">
          <span className="sword-crossguard" />
          <span className="sword-grip" />
          <span className="sword-pommel" />
        </div>
        <div className="relic-pendant relic-pendant--home" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><span /> ПАМЯТЬ О ТОМ, КТО НЕ СДАЛСЯ</p>
          <h1 id="hero-title">СМЕРТЬ —<br /><em>ЭТО ПУТЬ.</em></h1>
          <p className="hero-copy">Жанр, в котором каждый шаг вперёд<br className="desktop-break" /> приходится заслужить.</p>
          <a className="primary-link" href="#essence">
            <span>Открыть врата</span><span className="link-arrow" aria-hidden="true">↘</span>
          </a>
          <a className="hero-archive-link" href="games.html">
            <span>Листать архив игр</span><span>06 ЗАПИСЕЙ <i aria-hidden="true">↗</i></span>
          </a>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>01</span><i /><span>ПРОЛОГ</span>
        </div>
        <a className="scroll-cue" href="#essence"><span>ЛИСТАЙ ВНИЗ</span><i /></a>
        <p className="hero-side-note" aria-hidden="true">НЕ СМОТРИ НАЗАД · НЕСИ СВОЙ ОГОНЬ</p>
      </section>

      <section className="manifesto section-wrap" id="essence">
        <div className="section-kicker" data-reveal><span>01 / СУТЬ ЖАНРА</span><span>ИГРА НА ПРЕДЕЛЕ</span></div>
        <div className="manifesto-grid">
          <h2 data-reveal>Мир не обещал<br />тебе <em>победы.</em></h2>
          <div className="manifesto-copy" data-reveal>
            <p className="dropcap">Он обещал только дорогу. Холодные крепости, забытые боги и существа, которым не место в легендах. Здесь не ведут за руку. Здесь учатся видеть.</p>
            <p>Soulslike — это не про то, как часто ты падаешь. Это про миг, когда ты поднимаешься, уже зная цену следующей попытки.</p>
            <a className="text-link" href="#journey">В чём дело <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="manifesto-rule" aria-hidden="true"><span>✳</span></div>
      </section>

      <section className="ritual-archive section-wrap" id="rites">
        <div className="section-kicker" data-reveal><span>01 / ПРИЗНАКИ МГЛЫ</span><span>СОБЫТИЯ И ЗНАМЕНИЯ</span></div>
        <div className="ritual-grid">
          {rituals.map((ritual, index) => (
            <article className="ritual-card" key={ritual.title} data-reveal style={{ '--card-delay': `${index * 120}ms` }}>
              <div className="ritual-card__edge" aria-hidden="true" />
              <p className="ritual-card__tag">{ritual.tag}</p>
              <h3>{ritual.title}</h3>
              <p>{ritual.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="medieval-ornament section-wrap" aria-label="Средневековая вставка">
        <div className="ornament-rail" aria-hidden="true" />
        <div className="ornament-frame" data-reveal>
          <div className="ornament-seal" aria-hidden="true">
            <span>✦</span>
          </div>
          <p className="ornament-kicker">Chronica obscura</p>
          <h3>Старинная летопись<br />не про героев.<br />Про <em>выдержку.</em></h3>
          <div className="ornament-meta">
            <span>Лист 09</span>
            <span>Герб Пепла</span>
            <span>Церковь тишины</span>
          </div>
        </div>
        <div className="ornament-rail ornament-rail--right" aria-hidden="true" />
      </section>

      <section className="journey" id="journey">
        <div className="journey-image">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=85"
            alt="Одинокие вершины, уходящие в ночной туман"
            loading="lazy"
          />
          <span className="image-caption">ЗЕМЛИ, КОТОРЫЕ ПОМНЯТ ТВОЁ ИМЯ</span>
          <div className="image-stamp" aria-hidden="true">
            <span>МЕТКА / 03</span>
            <strong>ХОЛОДНЫЙ<br />ПЕРЕВАЛ</strong>
            <i />
          </div>
        </div>
        <div className="journey-content" data-reveal>
          <p className="eyebrow"><span /> ПУТЬ ЧЕРЕЗ ПЕПЕЛ</p>
          <h2>Не ищи<br />лёгкой <em>дороги.</em></h2>
          <p>Исследуй мир, который не объясняет себя. Запоминай движения врагов. Находи покой у костра — и снова уходи в темноту.</p>
          <div className="journey-stats">
            <div><strong>01</strong><span>УЧИСЬ<br />НА ОШИБКАХ</span></div>
            <div><strong>02</strong><span>ЧИТАЙ<br />МЕЖДУ СТРОК</span></div>
            <div><strong>03</strong><span>ВОЗВРАЩАЙСЯ<br />СИЛЬНЕЕ</span></div>
          </div>
        </div>
      </section>

      <section className="codex section-wrap" id="codex">
        <div className="section-kicker" data-reveal><span>02 / КОДЕКС ПЕПЛА</span><span>ТРИ НЕПРЕЛОЖНЫХ ЗАКОНА</span></div>
        <div className="codex-heading" data-reveal>
          <h2>Запомни это<br /><em>перед дорогой.</em></h2>
          <p>Негласные правила тех,<br />кто дошёл до конца.</p>
        </div>
        <div className="codex-layout" data-reveal>
          <div className="vow-list" role="tablist" aria-label="Законы Кодекса Пепла">
            {vows.map((vow, index) => (
              <button
                className={activeVow === index ? 'vow-tab is-active' : 'vow-tab'}
                id={`vow-tab-${index}`}
                key={vow.number}
                type="button"
                role="tab"
                aria-selected={activeVow === index}
                aria-controls="vow-panel"
                onClick={() => setActiveVow(index)}
              >
                <span className="vow-number">{vow.number}</span>
                <span>{vow.title}</span>
                <span className="vow-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="vow-panel" id="vow-panel" role="tabpanel" aria-labelledby={`vow-tab-${activeVow}`}>
            <span className="panel-mark" aria-hidden="true">✳</span>
            <p className="panel-label">ЗАКОН {vows[activeVow].number}</p>
            <h3>{vows[activeVow].title}</h3>
            <p className="panel-copy">{vows[activeVow].text}</p>
            <span className="panel-sigil">{vows[activeVow].mark}</span>
          </div>
        </div>
      </section>

      <footer className="finale">
        <div className="finale-art" aria-hidden="true" />
        <div className="relic-sword relic-sword--finale" aria-hidden="true">
          <span className="sword-crossguard" />
          <span className="sword-grip" />
          <span className="sword-pommel" />
        </div>
        <div className="finale-content" data-reveal>
          <p className="eyebrow"><span /> ТЫ ВСЁ ЕЩЁ ЗДЕСЬ</p>
          <h2>Значит,<br /><em>ещё не конец.</em></h2>
          <a className="primary-link" href="#top"><span>Начать сначала</span><span className="link-arrow" aria-hidden="true">↑</span></a>
        </div>
        <div className="footer-bottom">
          <a className="wordmark" href="#top"><span className="wordmark-seal" aria-hidden="true">✳</span><span>ПЕПЕЛ<span className="wordmark-period">.</span></span></a>
          <span>ХРОНИКА ЖАНРА SOULSLIKE</span>
          <a href="#top" className="back-top">НАВЕРХ ↑</a>
        </div>
      </footer>
    </main>
    </>
  )
}

export default App
