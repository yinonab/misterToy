import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/style/main.scss'
import { ToyIndex } from './pages/ToyIndex'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { ToyDetails } from './pages/ToyDetails'
import { UserMsg } from './cmps/UserMsg'
import { DashboardPage } from './pages/DashboardPage'
import { AboutPage } from './pages/AboutPage'
import { LoginSignup } from './cmps/LoginSignup'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <UserMsg />
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutPage />} path="/about" />
                            <Route element={<DashboardPage />} path="/dashboard" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<LoginSignup />} path="/auth/login" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>
    )


}