import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import supabase from "./config/supabaseClient"
import { useState, useEffect } from "react"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (!session) {
    return (
      <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          redirectTo="https://ptcmbcbcbtmybemguuib.supabase.co/auth/v1/callback"
      />
    )



  }
  else {
    return (
      <BrowserRouter>
        <nav>
          <h1>Recipe Vault</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create New Recipe</Link>
          <button onClick={handleLogout}>
            <i className="material-icons">logout</i>
          </button>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App