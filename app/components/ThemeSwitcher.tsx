'use client'

import { useEffect, useState } from 'react'
import { useGlobal } from '@/context/GlobalContext'
import { Button } from '@/components/Button'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useGlobal()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex gap-2">
      <Button
        view={theme === 'light' ? 'action' : 'normal'}
        size='m'
        onClick={() => setTheme('light')}
      >
        Light
      </Button>
      <Button
        view={theme === 'dark' ? 'action' : 'normal'}
        size='m'
        onClick={() => setTheme('dark')}
      >
        Dark
      </Button>
      <Button
        view={theme === 'light-hc' ? 'action' : 'normal'}
        size='m'
        onClick={() => setTheme('light-hc')}
      >
        Light HC
      </Button>
      <Button
        view={theme === 'dark-hc' ? 'action' : 'normal'}
        size='m'
        onClick={() => setTheme('dark-hc')}
      >
        Dark HC
      </Button>
    </div>
  )
}
