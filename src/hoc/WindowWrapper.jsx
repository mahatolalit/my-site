import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMaximized, isMinimized } = windows[windowKey];

    const ref = useRef(null);
    const draggableRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });

    useGSAP(()=> {
        const el = ref.current
        if(!el || !isOpen) return;

        el.style.display = "block"
        gsap.fromTo(
            el,
            { scale: 0.8, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        )
    }, [isOpen])

    useGSAP(()=> {
      const el = ref.current
      if(!el) return;

      const [instance] = Draggable.create(el, {
        onPress() { focusWindow(windowKey) },
        allowEventDefault: true,
        dragClickables: false,
      });
      draggableRef.current = instance


      return () => {
        instance.kill()
      }
    }, [])

    useLayoutEffect(()=> {
        const el = ref.current
        if (!el) return
        
        if (isOpen && !isMinimized) {
            el.style.display = "block"
            // Restore scale/opacity if needed, but GSAP animation above handles opening
            // When un-minimizing, we might want to animate in?
            // For now, simple toggling.
            if (!isMaximized) {
                // Ensure transforms are respected if not maximized
                if (draggableRef.current) draggableRef.current.enable()
            }
        } else {
            el.style.display = "none"
        }

    }, [isOpen, isMinimized])

    useGSAP(() => {
        const el = ref.current;
        if(!el) return;

        if(isMaximized) {
            if(draggableRef.current) {
                lastPosition.current = { x: draggableRef.current.x, y: draggableRef.current.y };
                draggableRef.current.disable();
            }
            
            const nav = document.querySelector("nav");
            const navHeight = nav ? nav.getBoundingClientRect().height : 0;

            gsap.to(el, {
                width: "100%",
                height: `calc(100vh - ${navHeight}px)`,
                top: navHeight,
                left: 0,
                xPercent: 0,
                yPercent: 0,
                x: 0, 
                y: 0,
                borderRadius: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        } else {
            const { x, y } = lastPosition.current;
            
            gsap.to(el, {
                width: "auto", 
                height: "auto",
                borderRadius: "0.5rem",
                clearProps: "top,left,width,height", // Clear size/pos overrides but Keep x/y transforms if possible or reset them below
                x: x,
                y: y,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                     if (draggableRef.current) {
                        draggableRef.current.enable();
                        draggableRef.current.update(); 
                     }
                }
            });
        }
    }, [isMaximized])

    return (
      <section 
        id={windowKey} 
        ref={ref} 
        style={{ zIndex }}
        className="absolute"
      >
        <Component { ...props } />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName ||
    Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;