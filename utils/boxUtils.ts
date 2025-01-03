function calculateDiagonalFit(boxLength: number, boxWidth: number, itemLength: number, itemWidth: number, itemHeight: number): boolean {
    // good ol pythagorean theorem
    const boxDiagonal = Math.sqrt(boxLength ** 2 + boxWidth ** 2)
    // find the biggest diagonal of the item which sets the constraint of which box it could potentially fit in
    const itemDiagonal = Math.max(
            Math.sqrt(itemLength ** 2 + itemWidth ** 2),
            Math.sqrt(itemLength ** 2 + itemHeight ** 2),
            Math.sqrt(itemWidth ** 2 + itemHeight ** 2)
    )
    return itemDiagonal <= boxDiagonal
}

export function findClosestBox(
    boxes: [number, number, number][],
     itemDimensions: [number, number, number]
    ): {box: [number, number, number] | null, isDiagonal: boolean} {
    // cheeky unpack
    const[itemLength, itemWidth, itemHeight] = itemDimensions
    //  few know this...
    const itemVolume = itemLength * itemWidth * itemHeight
    // can be a array of number or null, but also initializes closestBox to null
    let closestBox: [number, number, number] | null = null
    let isDiagonal = false
    let smallestVolumeDifference = Infinity

    boxes.forEach(box => {
        // this is every possible orientation of the box,
        // e.g. second row is rotating the width and height,
        // third row rotates the length and width
        // e.g. if you had an item that was 10x5x6 
        // my previous algorithm would ignore a box that was
        // 6 x 10 x 5, and say go for a box above it like 10 x 10 x10
        const orientations: [number, number, number][] = [
            [box[0], box[1], box[2]],
            [box[0], box[2], box[1]],
            [box[1], box[0], box[2]],
            [box[1], box[2], box[0]],
            [box[2], box[0], box[1]],
            [box[2], box[1], box[0]]
        ]
        orientations.forEach(orientation => {
            const [boxLength, boxWidth, boxHeight] = orientation
            const boxVolume = boxLength * boxWidth * boxHeight

            const normalFit = itemLength <= boxLength && itemWidth <= boxWidth && itemHeight <= boxHeight

            // is the item's diagonal less than the box's diagonal and is the minimum dimension of the box less than the box's height
            const diagonalFit = calculateDiagonalFit(boxLength, boxWidth, itemLength, itemWidth, itemHeight) &&
                Math.min(itemLength, itemWidth, itemHeight) <= boxHeight
            
                if (normalFit || diagonalFit) {
                    const volumeDifference = Math.abs(boxVolume - itemVolume)
                    if (volumeDifference < smallestVolumeDifference) {
                        closestBox = orientation
                        isDiagonal = !normalFit && diagonalFit
                        smallestVolumeDifference = volumeDifference
                    }
                }
        })
    })
    return {box : closestBox, isDiagonal}
}