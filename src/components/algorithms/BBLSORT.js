// sortingAlgorithms.js

export const bubbleSortWithAnimation = async (array, updateStateCallback) =>
{
    if (!Array.isArray(array))
    {
        throw new Error("Invalid array provided");
    }

    const newArray = [...array];
    let n = newArray.length;
    let swapped;

    do
    {
        swapped = false;
        for (let i = 0; i < n - 1; i++)
        {
            if (newArray[i] > newArray[i + 1])
            {
                // Swap elements
                [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
                swapped = true;

                // Update state and add a delay for animation
                await updateStateCallback([...newArray]);
            }
        }
        n--; // Decrease the size of the unsorted portion
    } while (swapped);

    return newArray;
};
