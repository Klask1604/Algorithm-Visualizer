const radixSort = async (array, updateStateCallback) => {
  const newArray = [...array];
  const maxVal = Math.max(...newArray.map((bar) => bar.value));

  let exp = 1;
  let isSorting = true;

  const changes = [];

  while (isSorting) {
    isSorting = false;
    const buckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < newArray.length; i++) {
      const digit = Math.floor(newArray[i].value / exp) % 10;
      buckets[digit].push(newArray[i]);

      if (!isSorting && digit > 0) {
        isSorting = true;
      }
    }

    exp *= 10;

    newArray.length = 0;
    for (let i = 0; i < buckets.length; i++) {
      newArray.push(...buckets[i]);
    }

    // Accumulate changes for the current pass
    changes.push(
      newArray.map((bar, index) => ({
        ...bar,
        isComparing: true,
      }))
    );

    // Add a delay for animation
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Reset isComparing after the delay
    changes.push(
      newArray.map((bar) => ({
        ...bar,
        isComparing: false,
      }))
    );
  }

  // Set isSorted after the sorting is complete
  changes.push(
    newArray.map((bar, index) => ({
      ...bar,
      isSorted: true,
    }))
  );

  // Apply all accumulated changes
  for (let i = 0; i < changes.length; i++) {
    updateStateCallback(changes[i]);
    // Add a delay for animation between passes
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
};

export default radixSort;
