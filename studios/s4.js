// Studio 4

function pascal(row, pos) {
    return pos === 0 || pos === row
           ? 1
           : pascal(row - 1, pos - 1) + pascal(row - 1, pos);
}

// This function gives rise to a recursive process