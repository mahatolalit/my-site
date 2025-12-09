import Dock from '#components/Dock'
import Navbar from '#components/Navbar'
import StickyWIP from '#components/StickyWIP'
import Welcome from '#components/Welcome'
import React from 'react'

const App = () => {
  return (
    <main>
      <StickyWIP/> {/* WIP Notification */}
      <Navbar/>
      <Welcome/>
      <Dock/>
    </main>
  )
}

export default App