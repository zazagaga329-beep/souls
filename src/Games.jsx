import { useEffect, useRef, useState } from 'react'
import './App.css'
import './Games.css'

const games = [
  {
    id: 'elden-ring',
    number: '01',
    title: 'Elden Ring',
    subtitle: 'Междуземье зовёт',
    studio: 'FromSoftware · 2022',
    kind: 'ОТКРЫТЫЙ МИР',
    score: '9.8',
    steamId: '1245620',
    fallback: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
    description: 'Огромный мир, который не торопится объяснять свои тайны. От золотых равнин до подземных городов: почти за каждым горизонтом скрыт новый путь, а за ним — испытание, к которому ты ещё не готов.',
    review: 'Редкий случай, когда свобода не облегчает путь, а делает каждое открытие личным. Elden Ring берёт знакомую формулу и раздвигает её до размеров целого мифа.',
    tags: ['Исследование', 'Гибкий билд', 'Боссы'],
    metrics: [['ИССЛЕДОВАНИЕ', 5], ['БОЙ', 5], ['ВЫЗОВ', 5]],
  },
  {
    id: 'dark-souls-iii',
    number: '02',
    title: 'Dark Souls III',
    subtitle: 'Огонь догорает',
    studio: 'FromSoftware · 2016',
    kind: 'КЛАССИКА ЖАНРА',
    score: '9.4',
    steamId: '374320',
    fallback: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80',
    description: 'Пепельный Лордран стоит на краю конца времён. Узкие проходы, запоминающиеся схватки и мир, в котором даже знакомые места успели измениться.',
    review: 'Самая стремительная и отточенная часть трилогии. Каждый удар ощущается весомо, а финальные встречи звучат как прощание со всем жанром.',
    tags: ['Ритм боя', 'Мрачный мир', 'Трилогия'],
    metrics: [['ИССЛЕДОВАНИЕ', 4], ['БОЙ', 5], ['ВЫЗОВ', 5]],
  },
  {
    id: 'dark-souls-remastered',
    number: '03',
    title: 'Dark Souls Remastered',
    subtitle: 'Костёр вдалеке',
    studio: 'FromSoftware · 2018',
    kind: 'ИСТОК ЛЕГЕНДЫ',
    score: '9.2',
    steamId: '570940',
    fallback: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    description: 'Путешествие по Лордрану, где каждая короткая дверь может связать два конца огромного мира. Здесь важны терпение, наблюдательность и карта в голове.',
    review: 'Связность мира до сих пор впечатляет сильнее многих современных открытых пространств. Медленная, суровая классика, которая не боится оставить тебя наедине с неизвестностью.',
    tags: ['Исследование', 'Классика', 'Терпение'],
    metrics: [['ИССЛЕДОВАНИЕ', 5], ['БОЙ', 4], ['ВЫЗОВ', 4]],
  },
  {
    id: 'sekiro',
    number: '04',
    title: 'Sekiro: Shadows Die Twice',
    subtitle: 'Сталь помнит всё',
    studio: 'FromSoftware · 2019',
    kind: 'ПАРИРОВАНИЕ',
    score: '9.5',
    steamId: '814380',
    fallback: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80',
    description: 'Мифическая Япония эпохи Сэнгоку и путь воина, который не может позволить себе забыть ни одного движения противника. Победа здесь рождается из точного ритма клинков.',
    review: 'Sekiro требует не выносливости, а внимания. Бой превращается в разговор на стали, и однажды ты начинаешь слышать его ритм раньше, чем видишь удар.',
    tags: ['Точный бой', 'Япония', 'Без билдов'],
    metrics: [['ИССЛЕДОВАНИЕ', 4], ['БОЙ', 5], ['ВЫЗОВ', 5]],
  },
  {
    id: 'lies-of-p',
    number: '05',
    title: 'Lies of P',
    subtitle: 'Сказка для тех, кто вырос',
    studio: 'NEOWIZ · 2023',
    kind: 'НОВАЯ ШКОЛА',
    score: '9.0',
    steamId: '1627720',
    fallback: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80',
    description: 'Белль-Эпок, марионетки и сломанные обещания. Пиноккио просыпается в городе, где механические жители больше не слушаются создателей.',
    review: 'Плотная, собранная интерпретация жанра с красивым холодным городом и выразительной системой оружия. История сказки здесь звучит неожиданно горько.',
    tags: ['Готика', 'Оружие', 'Сложные боссы'],
    metrics: [['ИССЛЕДОВАНИЕ', 4], ['БОЙ', 4], ['ВЫЗОВ', 4]],
  },
  {
    id: 'nioh-2',
    number: '06',
    title: 'Nioh 2',
    subtitle: 'Кровь и ёкаи',
    studio: 'Team Ninja · 2020',
    kind: 'ЯПОНСКОЕ ФЭНТЕЗИ',
    score: '8.9',
    steamId: '1325200',
    fallback: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    description: 'Полуёкай среди войн и духов эпохи Сэнгоку. Стойки оружия, смена темпа и охота на демонов дают бою почти безграничную глубину.',
    review: 'Nioh 2 вознаграждает тех, кто любит учиться системе: сражения здесь быстрее и сложнее, а комбинации оружия легко превращают поражение в новый эксперимент.',
    tags: ['Глубокий бой', 'Ёкаи', 'Лут'],
    metrics: [['ИССЛЕДОВАНИЕ', 4], ['БОЙ', 5], ['ГЛУБИНА', 5]],
  },
]

function Games() {
  const dialogRef = useRef(null)
  const [activeGame, setActiveGame] = useState(null)

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')
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
          { threshold: 0.12 },
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

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${(index % 3) * 100}ms`)
      observer?.observe(item)
    })
    window.addEventListener('scroll', revealVisibleItems, { passive: true })
    window.addEventListener('resize', revealVisibleItems)
    requestAnimationFrame(revealVisibleItems)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', revealVisibleItems)
      window.removeEventListener('resize', revealVisibleItems)
    }
  }, [])

  function openGame(game) {
    setActiveGame(game)
    dialogRef.current?.showModal()
  }

  return (
    <main className="games-page">
      <header className="site-header games-header">
        <a className="wordmark" href="/" aria-label="Пепел — на главную">
          <span className="wordmark-seal" aria-hidden="true">✳</span>
          <span>ПЕПЕЛ<span className="wordmark-period">.</span></span>
        </a>
        <nav className="main-nav games-nav" aria-label="Основная навигация">
          <a href="/#essence">Суть жанра</a>
          <a href="/#journey">Путь героя</a>
          <a href="/#codex">Кодекс</a>
          <a className="is-current" href="/games.html" aria-current="page">Игры</a>
        </nav>
        <a className="header-link" href="/#top">На главную <span aria-hidden="true">↗</span></a>
      </header>

      <section className="games-intro" id="top">
        <div className="games-intro-art" aria-hidden="true" />
        <div className="relic-sword relic-sword--intro" aria-hidden="true">
          <span className="sword-crossguard" />
          <span className="sword-grip" />
          <span className="sword-pommel" />
        </div>
        <div className="relic-pendant" aria-hidden="true" />
        <div className="games-intro-content">
          <p className="eyebrow"><span /> АРХИВ ПАДШИХ КОРОЛЕВСТВ</p>
          <h1>МИРЫ,<br /><em>КОТОРЫЕ СТОЯТ БОЛИ.</em></h1>
          <p className="games-intro-copy">Шесть дорог в темноту. У каждой — свой голос, своя цена и причина вернуться.</p>
          <div className="games-count"><span>06</span><i /> ИСТОРИЙ В АРХИВЕ</div>
        </div>
        <span className="games-intro-index" aria-hidden="true">АРХИВ / 02</span>
      </section>

      <section className="games-catalog" aria-labelledby="catalog-title">
        <div className="relic-sword relic-sword--catalog" aria-hidden="true">
          <span className="sword-crossguard" />
          <span className="sword-grip" />
          <span className="sword-pommel" />
        </div>
        <div className="games-catalog-heading" data-reveal>
          <div>
            <p className="section-kicker-label">ВЫБРАННЫЕ ИСПЫТАНИЯ</p>
            <h2 id="catalog-title">Начни с <em>любой.</em></h2>
          </div>
          <p>Открой запись, чтобы прочесть<br />оценку и впечатления.</p>
        </div>
        <div className="games-grid">
          {games.map((game) => (
            <article className="game-card" key={game.id} data-reveal>
              <button className="game-card-button" type="button" onClick={() => openGame(game)} aria-label={`Открыть описание игры ${game.title}`}>
                <div className="game-art-wrap">
                  <img
                    className="game-art"
                    src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.steamId}/header.jpg`}
                    alt={`Обложка игры ${game.title}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = game.fallback
                    }}
                  />
                  <span className="game-number">{game.number}</span>
                  <span className="game-score"><strong>{game.score}</strong><small>ОЦЕНКА</small></span>
                </div>
                <div className="game-card-copy">
                  <div className="game-card-meta"><span>{game.kind}</span><span>{game.studio}</span></div>
                  <h3>{game.title}</h3>
                  <p>{game.subtitle}</p>
                  <span className="game-open">ЧИТАТЬ ЗАПИСЬ <span aria-hidden="true">↗</span></span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="games-footer">
        <a className="wordmark" href="/"><span className="wordmark-seal" aria-hidden="true">✳</span><span>ПЕПЕЛ<span className="wordmark-period">.</span></span></a>
        <span>ХРОНИКА ЖАНРА SOULSLIKE</span>
        <a className="back-top" href="#top">НАВЕРХ ↑</a>
      </footer>

      <dialog className="game-dialog" ref={dialogRef} onClose={() => setActiveGame(null)}>
        {activeGame && (
          <article className="game-detail">
            <div className="detail-art-wrap">
              <img
                src={`https://cdn.akamai.steamstatic.com/steam/apps/${activeGame.steamId}/header.jpg`}
                alt={`Обложка игры ${activeGame.title}`}
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = activeGame.fallback
                }}
              />
              <button className="detail-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Закрыть описание">×</button>
              <span className="detail-score"><strong>{activeGame.score}</strong><small>ОЦЕНКА «ПЕПЛА»</small></span>
            </div>
            <div className="detail-body">
              <p className="detail-eyebrow">{activeGame.kind} <span>·</span> {activeGame.studio}</p>
              <h2>{activeGame.title}</h2>
              <p className="detail-subtitle">{activeGame.subtitle}</p>
              <p className="detail-description">{activeGame.description}</p>
              <div className="detail-metrics" aria-label="Профиль игры">
                {activeGame.metrics.map(([label, value]) => (
                  <div className="detail-metric" key={label}>
                    <span>{label}</span>
                    <div className="metric-track" aria-hidden="true"><i style={{ width: `${value * 20}%` }} /></div>
                    <strong>{value}<small>/5</small></strong>
                  </div>
                ))}
              </div>
              <blockquote>«{activeGame.review}»</blockquote>
              <div className="detail-bottom">
                <div className="detail-tags" aria-label="Особенности игры">
                  {activeGame.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a href={`https://store.steampowered.com/app/${activeGame.steamId}/`} target="_blank" rel="noreferrer">СТРАНИЦА ИГРЫ ↗</a>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </main>
  )
}

export default Games