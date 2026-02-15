import React, { useRef, useLayoutEffect } from 'react'
import { finderItems, locations, dockApps } from '#constants'
import useWindowStore from '#store/window'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

const Home = () => {
    const { openWindow } = useWindowStore()
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        let draggables = [];
        const ctx = gsap.context(() => {
            draggables = Draggable.create(".desktop-icon", {
                bounds: containerRef.current,
                inertia: true,
                onDragStart: function() {
                    gsap.to(this.target, { scale: 1.1, duration: 0.1 });
                    this.startPos = { x: this.x, y: this.y };
                },
                onDragEnd: function() {
                    gsap.to(this.target, { scale: 1, duration: 0.1 });
                    
                    let hit = false;
                    for (let i = 0; i < draggables.length; i++) {
                        if (draggables[i].target !== this.target && this.hitTest(draggables[i].target, "50%")) {
                            hit = true;
                            break;
                        }
                    }

                    if (hit) {
                        gsap.to(this.target, { 
                            x: this.startPos.x, 
                            y: this.startPos.y, 
                            duration: 0.3, 
                            ease: "power2.out" 
                        });
                    }
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const getIcon = (item) => {
        if (item.title === 'Resume') return '/images/pdf.png'
        if (item.title === 'Trash') return '/images/trash-full.png'
        if (item.title === 'Socials') return '/images/folder.png' // Or specific icon if folder
        return '/images/folder.png'
    }

    const handleIconClick = (item) => {
        if (this?.isDragging) return; // Prevent click if dragging
        
        if (item.title === 'Resume') {
            openWindow('resume')
            return
        }
        openWindow('finder', { activeId: item.id })
    };
    
    const desktopItems = finderItems.filter(item => item.title !== 'Trash'); 
    
    // Corner positions for spread layout (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
    const getPositionClass = (index) => {
        // Just spread them out based on index modulo 4
        switch(index % 4) {
            case 0: return "top-20 left-4 sm:top-24 sm:left-8"; // Top-Left
            case 1: return "top-20 right-4 sm:top-24 sm:right-8"; // Top-Right
            case 2: return "bottom-24 left-4 sm:bottom-32 sm:left-8"; // Bottom-Left
            case 3: return "bottom-24 right-4 sm:bottom-32 sm:right-8"; // Bottom-Right
            default: return "";
        }
    }

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Desktop Icons Container - Using absolute positioning for spread layout */}
            <div className="w-full h-full relative pointer-events-auto">
                 {desktopItems.map((item, index) => (
                    <div 
                        key={item.id}
                        className={`desktop-icon absolute flex flex-col items-center gap-1 group cursor-pointer w-20 sm:w-24 p-2 rounded hover:bg-white/10 transition-colors ${getPositionClass(index)}`}
                        onClick={(e) => {
                            // Only trigger if not dragging - simplistic check, but Draggable usually suppresses click
                            handleIconClick(item)
                        }}
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 shadow-lg">
                            <img 
                                src={getIcon(item)} 
                                alt={item.title} 
                                className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
                            />
                        </div>
                        <span className="text-white text-[10px] sm:text-xs font-medium drop-shadow-md px-2 py-0.5 rounded-sm bg-none group-hover:bg-blue-600/80 transition-colors text-center leading-tight shadow-black/50" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                            {item.title}
                        </span>
                    </div>
                 ))}
            </div>
        </div>
    )
}

export default Home
