import { Edges } from '@react-three/drei'

interface ItemProps {
    position: [number, number, number]
    size: [number, number, number]
    rotation? : [number, number, number]
}

export function Item({ position, size, rotation = [0,0,0] }: ItemProps) {
    return (
        <mesh position = {position} rotation = {rotation}>
            <boxGeometry args = {size} />
            <meshStandardMaterial color = "red" transparent opacity = {0.5} />
        </mesh>
    )
}