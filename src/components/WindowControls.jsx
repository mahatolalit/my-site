import useWindowStore from '#store/window'
import { Maximize2, Minus, X } from 'lucide-react'
import React from 'react'

const WindowControls = ({ target }) => {
    const { closeWindow, minimizeWindow, toggleMaximize } = useWindowStore()
  return (
    <div className='flex gap-2 group p-2' id='window-controls' data-no-drag>
        <div className='close flex-center' onClick={() => closeWindow(target)}>
            <X size={10} className='opacity-0 group-hover:opacity-100 max-sm:opacity-100 text-black/60 font-bold transition-opacity' />
        </div>
        <div className='minimize flex-center' onClick={() => minimizeWindow(target)}>
            <Minus size={10} className='opacity-0 group-hover:opacity-100 max-sm:opacity-100 text-black/60 font-bold transition-opacity' />
        </div>
        <div className='maximize flex-center' onClick={() => toggleMaximize(target)}>
            <Maximize2 size={8} className='opacity-0 group-hover:opacity-100 max-sm:opacity-100 text-black/60 font-bold transition-opacity' />
        </div>
    </div>
  )
}

export default WindowControls