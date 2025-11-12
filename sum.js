function bubbleSort(array, sortOrder, key) {
    let temp;
    let isSorted;
    let isThereAkey = key ? `.${key}` : "";
    let comparisonSymbol = sortOrder ? ">" : "<";
    for (let i = 0; i < array.length - 1; i++) {
        isSorted = true;
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (eval(`array[j]${isThereAkey} ${comparisonSymbol} array[j + 1]${isThereAkey}`)) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                isSorted = false;
            }
        }
        if (isSorted === true) return array;
    }


    return array;
}

module.exports = bubbleSort ;