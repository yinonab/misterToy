import { NavLink } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { LoginSignup } from './LoginSignup.jsx'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions.js'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')

        }
        catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot logout')

        }
    }
    return (
        <header className="app-header full">
            <h1>Toys App</h1>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
            {!user && <section className="user-info">
                <LoginSignup />
            </section>}
            {user && <section className="user-info">
                {/* <p>
                    {user.fullname} <span>${user.score.toLocaleString()}</span>
                </p> */}
                <button onClick={onLogout}>Logout</button>
            </section>}
        </header>
    )
}