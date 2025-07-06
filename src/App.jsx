import { useState, useEffect } from 'react'
import { Sun, Moon, Search, Link2Off, Archive, Wrench, AlertTriangle, HeartHandshake } from 'lucide-react'
import './App.css'

function App() {
  // Set initial mode based on localStorage or system preference
  const getInitialMode = () => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'false') return true // light mode
    if (saved === 'true') return false // dark mode
    // Default: dark mode
    return false
  }
  const [isLightMode, setIsLightMode] = useState(getInitialMode)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode)
  }, [isLightMode])

  const toggleDarkMode = () => {
    setIsLightMode((prev) => {
      localStorage.setItem('darkMode', !prev ? 'false' : 'true')
      return !prev
    })
  }

  const handleSearch = () => {
    const url = searchValue.trim()
    if (!url) return
    const type = url.includes('github.com') ? 'github' : 'website'
    window.location.href = `scan.html?url=${encodeURIComponent(url)}&type=${type}`
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchValue('')
  }

  // Debug log
  console.log('isLightMode:', isLightMode)

  return (
    <div className={`app${isLightMode ? ' light-mode' : ''}`}>
      {/* Top left: dark mode toggle */}
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {isLightMode ? <Moon size={24} /> : <Sun size={24} />}
      </button>

      {/* Top right: GitHub icon */}
      <span
        className="github-logo"
        onClick={() => window.open('https://placeholder.com', '_blank')}
        style={{ display: 'inline-block', cursor: 'pointer' }}
        title="GitHub"
      >
        <svg
          height="36"
          width="36"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill={isLightMode ? '#000' : '#fff'} />
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
          -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64
          -.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18
          1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56
          .82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2
          0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            fill={isLightMode ? '#fff' : '#000'}
          />
        </svg>
      </span>

      <main>
        {/* Animated logo text */}
        <h1><span className="typewriter">DEADLINK</span></h1>
        <p>Scan, archive & fix broken links before they hurt your users.</p>

        {/* Feature icons row */}
        <div className="icons">
          <Search size={24} title="Scan" />
          <Link2Off size={24} title="Detect broken links" />
          <Archive size={24} title="Archive" />
          <Wrench size={24} title="Fix" />
          <AlertTriangle size={24} title="Drift detection" />
        </div>

        {/* Search input with clear button */}
        <div className="search-wrapper">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onMouseEnter={(e) => {
              if (!searchValue) e.target.placeholder = 'Paste your GitHub repo or website URL'
            }}
            onMouseLeave={(e) => {
              if (!searchValue) e.target.placeholder = 'Search'
            }}
            onFocus={(e) => {
              if (!searchValue) e.target.placeholder = 'Paste your GitHub repo or website URL'
            }}
            onBlur={(e) => {
              if (!searchValue) e.target.placeholder = 'Search'
            }}
          />
          {searchValue && (
            <button className="clear-btn visible" onClick={clearSearch} title="Clear">
              &times;
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="buttons">
          <button className="btn" onClick={handleSearch}>Scan</button>
        </div>
      </main>

      <footer>
        Made <HeartHandshake size={16} /> by Adhithiya sv –
        <a href="https://github.com/sva0-0" target="_blank" rel="noopener noreferrer">GitHub</a>
      </footer>
    </div>
  )
}

export default App 