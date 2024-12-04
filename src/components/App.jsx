import { useEffect, useState } from "react"
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import Search from "./Search"
import "./App.css"

export default function App() {
  const user = useAuthentication()

  return (
    <div className="App">
      <header>
        Music Rank
      </header>
      <main>
        <div className = "Genre">
          <button>Genre</button>
        </div>
        <div className = "Ranking">
          <button>Ranking</button>
        </div>
        <div className="auth">
          {user ? <SignOut /> : <SignIn />}
        </div>
        <div className="Search">
          <Search />
        </div>
        
      </main>

    </div>
  )
}