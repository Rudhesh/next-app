'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const ThemeButton: () => JSX.Element | null = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }


  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <WbSunnyIcon className='h-5 w-5 text-orange-300' />
      ) : (
        <DarkModeIcon className='h-5 w-5 text-slate-800' />
      )}
    </button>
  )
}

export default ThemeButton
