import Dock from '#components/Dock'
import Navbar from '#components/Navbar'
import StickyWIP from '#components/StickyWIP'
import Welcome from '#components/Welcome'
import React from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import Terminal from '#windows/Terminal'
import Safari from '#windows/Safari'
import Resume from '#windows/Resume'
import Contact from '#windows/Contact'
gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <StickyWIP/> {/* WIP notification banner */}
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari/>
      <Resume className="left-0 right-0 mx-auto top-[8%] w-[70%] sm:w-[60%] h-[70%] sm:h-[80vh]"/>
      <Contact className="left-0 right-0 mx-auto top-[15%] w-[90%] sm:w-[40%] h-[70vh]"/>
    </main>
  )
}

export default App