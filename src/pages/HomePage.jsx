import logoUrl from '../assets/img/logo.png'




export function HomePage() {
    return (
        <section className='home-section'>
            <h2>Welcome to our store!! </h2>
            <img src={logoUrl} alt='App Logo' />
        </section >
    )
}