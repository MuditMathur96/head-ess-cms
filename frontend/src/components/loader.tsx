import { Circle, CircleArrowLeft, Loader2 } from 'lucide-react'
import React from 'react'

type Props = {
    size:"sm" | "md" | "lg" | "xl" | "2xl"
}

function Loader({size="sm"}: Props) {
  return (
    <Loader2 
    className={`
        animate-spin
        ${size==="2xl"?"w-32 h-32":size === "xl"?"w-20 h-20": size === "lg"?" w-14 h-14":size === "md"?"w-10 h-10":"w-5 h-5"}
        `}
    />
  )
}

export default Loader