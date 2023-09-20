import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

export function App() {

  return (
      <Provider store={store}>
          <Router>
              <section className="main-layout app">
                  {/* <AppHeader /> */}
                  <main>
                      <Routes>
                          {/* <Route element={<HomePage />} path="/" />
                          <Route element={<AboutUs />} path="/about" /> */}
                          { <Route element={<ToyIndex  />} path="/" /> }
                          {/* <Route element={<ContactIndex  />} path="/contact" />
                          <Route element={<ContactDetails />} path="/contact/:contactId" /> */} 
                      </Routes>
                  </main>
                  {/* <AppFooter /> */}
              </section>
          </Router>
      </Provider>
  )
     
  
}