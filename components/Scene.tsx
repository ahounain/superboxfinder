import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Box } from './Box'
import { Item } from './Item'

interface SceneProps {
  itemDimensions: { length: number; width: number; height: number }
  closestBoxResult: { box: [number, number , number] | null; isDiagonal: boolean }
}

export default function Scene({ itemDimensions, closestBoxResult }: SceneProps) {
  const isDiagonal = closestBoxResult.isDiagonal;

  // Set the rotation angle based on whether the item is diagonal
  const rotationAngle = isDiagonal ? Math.PI / 4 : 0;

  // Position both boxes at the same center point
  const centerPosition: [number, number, number] = [0, 0, 0]; // Center of the scene

  // Adjust the item position to account for its height
  const itemPosition: [number, number, number] = [0, 0, 0];

  // Adjust the outer box position to account for its height
  const outerBoxHeight = closestBoxResult.box ? closestBoxResult.box[1] : 0;
  const outerBoxPosition = [0, outerBoxHeight / 2, 0];

  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      {closestBoxResult.box && (
        <Box
          position={centerPosition}
          size={closestBoxResult.box}
          color="lightblue"
        />
      )}

      <Item
        position={itemPosition}
        size={[itemDimensions.length, itemDimensions.height, itemDimensions.width]}
        rotation={[0, rotationAngle, 0]}
      />

      <Environment files="/venice_sunset_1k.hdr" background />
    </Canvas>
  )
}