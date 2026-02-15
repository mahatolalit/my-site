import Dock from '#components/Dock'
import Navbar from '#components/Navbar'
import StickyWIP from '#components/StickyWIP'
import Welcome from '#components/Welcome'
import Home from '#components/Home'
import React from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import Terminal from '#windows/Terminal'
import Safari from '#windows/Safari'
import Resume from '#windows/Resume'
import Contact from '#windows/Contact'
import Finder from '#windows/Finder'
import ImgFile from '#windows/ImgFile'
gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <StickyWIP/> {/* WIP notification banner */}
      <Home />
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal className="left-0 right-0 mx-auto top-[10%] sm:top-[15%] w-[90%] sm:w-[60%] h-[80%] sm:h-[70vh] translate-x-0"/>
      <Safari className="left-0 right-0 mx-auto top-[10%] sm:top-[15%] w-[90%] sm:w-[60%] h-[80%] sm:h-[70vh] translate-x-0"/>
      <Finder className="left-0 right-0 mx-auto top-[10%] sm:top-[15%] w-[90%] sm:w-[60%] h-[80%] sm:h-[70vh] translate-x-0"/>
      <ImgFile/>
      <Resume className="left-[15%] sm:left-[20%] right-0 top-[8%] w-[70%] sm:w-[60%] h-[70%] sm:h-[80vh] translate-x-0"/>
      <Contact className="left-[5%] sm:left-[30%] right-0 top-[15%] w-[90%] sm:w-[40%] h-[70vh] translate-x-0"/>
    </main>
  )
}

export default App