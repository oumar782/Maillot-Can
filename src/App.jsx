import { useState } from 'react'
import Header from './Composant/Header'
import Hero from './Composant/Hero'
import Card from './Composant/Card'
import Reservation from './Composant/Reservation'
import Footer from './Composant/Footer'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Card />
      <Reservation />
      <Footer />
      {/* Contenu principal pour tester */}
      
    </>
  )
}

export default App