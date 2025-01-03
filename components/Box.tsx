import { Edges } from '@react-three/drei'

interface BoxProps {
    position: [number, number, number]
    size: [number, number, number]
    color: string
}

export function Box({ position, size, color}: BoxProps) {
    return (
        <mesh position = {position}>
            <boxGeometry args = {size} />
            <meshStandardMaterial color = {color} transparent opacity = {0.5} />
            <Edges />
        </mesh>
    )
}