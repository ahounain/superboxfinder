'use client'

import { useState, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { findClosestBox } from '@/utils/boxUtils'
import {  Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function BoxFinder() {
  const [itemDimensions, setItemDimensions] = useState({
     length: 1,
     width: 1,
    height: 1 
  })
  const [closestBoxResult, setClosestBoxResult] = useState<{
     box: [number, number, number] | null,
    isDiagonal: boolean 
  }>({ box: null, isDiagonal: false });
  const [searchPerformed, setSearchPerformed] = useState(false)
  const boxesRef = useRef<[number, number, number][]>([
    [6,6,6],
    [8,8,8],
    [10,10,10],
    [12,12,12],
    [14,14,14],
    [16, 16, 16], // Added for testing diagonal fit
    [18,18,18]
  ])

  const handleFindBox = () => {
    const result = findClosestBox(
      boxesRef.current, 
      [
       itemDimensions.length,
       itemDimensions.width,
       itemDimensions.height
      ]
      )
    setClosestBoxResult(result)
    setSearchPerformed(true)
  }

  const handleAddBox = (event: React.FormEvent<HTMLFormElement>) => {
    // prevents page refresh
    event.preventDefault()
    const form = event.currentTarget
    const length = parseFloat(form.boxLength.value)
    const width = parseFloat(form.boxWidth.value)
    const height = parseFloat(form.boxHeight.value)
    
  // const length = form.elements.namedItem('boxLength') as HTMLInputElemen
    // adds the inputted array to the list of boxes
    boxesRef.current = [...boxesRef.current, [length, width, height]]
    form.reset()
  }

  return (
    <>
      <div className="w-full max-w-4xl">
        <Card className='p-4 mb-4'>
          <div className="flex spacex-4 ">
            <Input
              type="number"
              placeholder="Length"
              onChange={(e) => setItemDimensions({ ...itemDimensions, length: parseFloat(e.target.value) || 0 })}
              className="border p-2 rounded"
              aria-label="Item Length"
            />
            <Input
              type="number"
              placeholder="Width"
              onChange={(e) => setItemDimensions({ ...itemDimensions, width: parseFloat(e.target.value) || 0 })}
              className="border p-2 rounded"
              aria-label="Item Width"
            />
            <Input
              type="number"
              placeholder="Height"
              onChange={(e) => setItemDimensions({ ...itemDimensions, height: parseFloat(e.target.value) || 0 })}
              className="border p-2 rounded"
              aria-label="Item Height"
            />
            <Button onClick={handleFindBox}>
              Find Box
            </Button>
          </div>
        </Card>

        {searchPerformed && (
          <div className={`mb-4 p-4 rounded-lg ${closestBoxResult.box ? 'bg-green-100' : 'bg-red-100'}`}>
            {closestBoxResult.box ? (
              <>
                <h2 className="text-xl font-bold mb-2">Closest Box Found:</h2>
                <p>Dimensions: {closestBoxResult.box[0]} x {closestBoxResult.box[1]} x {closestBoxResult.box[2]}</p>
                {closestBoxResult.isDiagonal && (
                  <p className="text-orange-600 font-bold">Note: Item needs to be inserted diagonally.</p>
                )}
              </>
            ) : (
              <p className="text-red-700 font-bold">No suitable box found for the given item dimensions.</p>
            )}
          </div>
        )}

        <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
          <Scene itemDimensions={itemDimensions} closestBoxResult={closestBoxResult} />
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Available Boxes:</h2>
          <ul className="list-disc list-inside">
            {boxesRef.current.map((box, index) => (
              <li key={index}>{box[0]} x {box[1]} x {box[2]}</li>
            ))}
          </ul>
        </div>
        <div className="w-full max-w-4xl">
        <Card className="p-4 mb-4 mt-4">
          <form onSubmit={handleAddBox} className="flex spacex-4">
            <div className = "flex space x-4 w-full">
            <Input type="number" name="boxLength" placeholder="Length" required aria-label="Box Length" />
            <Input type="number" name="boxWidth" placeholder="Width" required aria-label="Box Width" />
            <Input type="number" name="boxHeight" placeholder="Height" required aria-label="Box Height" />
            <Button>
              Add Box
            </Button>
            </div>
          </form>
        </Card>
        </div>
      </div>
    </>
  )
}