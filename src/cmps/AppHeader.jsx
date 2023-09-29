import { NavLink } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
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
            <nav >
                <NavLink title='Home' to="/"><i className="fa-solid fa-house fa-lg"></i></NavLink>
                <NavLink title='About' to="/about"><i className="fa-solid fa-circle-info fa-lg"></i></NavLink>
                <NavLink title='Toys' to="/toy"><i className="fa-solid fa-gamepad fa-lg"></i></NavLink>
                <NavLink title='Dashboard' to="/dashboard"><i className="fa-solid fa-chart-line fa-lg"></i></NavLink>
                {!user && <span className="user-info">
                    <NavLink title='Login' to="/auth/login"><i className="fa-solid fa-user fa-lg"></i></NavLink>
                </span>}
            </nav>
            {user && <div className="user-info">
                {/* <p>
                    {user.fullname} <span>${user.score.toLocaleString()}</span>
                </p> */}
                <button className='logout-btn' onClick={onLogout}>Logout</button>
            </div>}
        </header>
    )
}