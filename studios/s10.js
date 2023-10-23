function bubblesort_list(xs) {
    const len = length(xs);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let ptr = xs;
        for (let j = 0; j < i; j = j + 1) {
            bubble(ptr);
            ptr = tail(ptr);
        } 
    }
}

function bubble(xs) {
    if (head(xs) > head(tail(xs))) {
        let tmp = head(xs);
        set_head(xs, head(tail(xs)));
        set_head(tail(xs), tmp);
    }
}


const LL = list(3, 5, 2, 4, 1, 1);
bubblesort_list(LL);
LL; // should show [1, [2, [3, [4, [5, null]]]]]
