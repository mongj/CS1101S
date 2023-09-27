const A = list(list(2,2,3), list(4,5,6), list(7,8,9));

//work in progress
function rref(matrix) {
    const row = head(matrix);
    const denom = head(row);
    const r = denom === 1 ? row : map(x => x / denom, row);
    return r;
}

rref(A);

//for_each(x => display(x), A);