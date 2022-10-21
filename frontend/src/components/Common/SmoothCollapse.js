import React, { useRef, useEffect, useState } from 'react'

const SmoothCollapse = ({ className, show, children }) => {
    const [width, setWidth] = useState("0")
    const ref = useRef()

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current.scrollWidth + "px")
        }
    }, [show])

    return (
        <div
            ref={ref}
            className={className}
            style={{
                maxWidth: show ? width : 0,
                transition: "all 0.2s ease",
                overflow: "hidden",
            }}
        >
            {children}
        </div>
    )
}

export default SmoothCollapse