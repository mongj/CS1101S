// Implementing accumulate
function accumulate(f, init, lst) {
    return is_null(lst)
           ? init
           : f(head(lst), accumulate(f, init, tail(lst)));
}

display(accumulate((x, y) => x + y, 0, list(1,2,3)), "accumulate:");

// Implementing filter
function filter(pred, xs) {
    return is_null(xs)
           ? null
           : pred(head(xs))
           ? pair(head(xs), filter(pred, tail(xs)))
           : filter(pred, tail(xs));
}

display_list(filter(x => x > 2, list(1,2,3,4,5)), "filter:");

// Implementing filter with accumulate
function filter_acc(pred, xs) {
    const f = (h, acc) => is_null(h)
                          ? null
                          : pred(h)
                          ? pair(h, acc)
                          : acc;
                          
    return accumulate(f, null, xs);
}

display_list(filter_acc(x => x > 2, list(1,2,3,4,5)), "filter_acc:");

// Implementing map
function map(f, xs) {
    return is_null(xs)
           ? null
           : pair(f(head(xs)), map(f, tail(xs)));
}

display_list(map(x => x + 1, list(1,2,3)), "map:");

// Implementing map with accumulate
function map_acc(f, xs) {
    return accumulate((x, y) => pair(f(x), y), null, xs);
}

display_list(map_acc(x => x + 1, list(1,2,3)), "map_acc:");