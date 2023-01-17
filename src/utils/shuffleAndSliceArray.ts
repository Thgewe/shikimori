/**
 * Creates a new shuffled array from the given one, and returns only the portion of it specified by "limit"
 * If the passed "limit" is greater than the length of the array, then the entire array is returned.
 * The original array will not be modified.
 * @param array {any} An array from which to form a new sorted and limited
 * @param limit {number} The number of elements to leave in the array
 * @return any[]
 */
const shuffleAndSliceArray = (array: any[], limit: number) => {
    if (array.length < limit) return array
    const newArray: any[] = []
    const shuffled = [...array]
    shuffled.sort(() => Math.random() - 0.5);
    for (let i = 0; i < limit; i++) {
        newArray.push(shuffled[i])
    }
    return newArray
}

export default shuffleAndSliceArray;