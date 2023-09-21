import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <h1>Toys App</h1>
            <nav>
                <NavLink to="/">Home</NavLink> | 
                 <NavLink to="/about">About</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> 
            </nav>

        </header>
    )
}