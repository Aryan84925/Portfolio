import { useEffect, useState } from 'react'
import './App.css'
import AppRouter from './AppRouter.jsx'
import { supabase } from './lib/supabaseClient'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const userId = session?.user?.id
        if (!userId) {
          setIsAdmin(false)
          return
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single()

        if (error) {
          console.error('Profile fetch error:', error.message)
          setIsAdmin(false)
          return
        }

        setIsAdmin(profile?.role === 'admin')
      } catch (err) {
        console.error('Session check error:', err)
        setIsAdmin(false)
      }
    }

    loadUser()

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user?.id
      if (!userId) {
        setIsAdmin(false)
        return
      }

      supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()
        .then(({ data: profile, error }) => {
          if (error) {
            console.error('Auth change profile error:', error.message)
            setIsAdmin(false)
            return
          }
          setIsAdmin(profile?.role === 'admin')
        })
        .catch((error) => {
          console.error('Auth change fetch error:', error)
          setIsAdmin(false)
        })
    })

    return () => {
      data?.subscription?.unsubscribe()
    }
  }, [])

  return (
    <>
      <AppRouter isAdmin={isAdmin} />
    </>
  )
}
