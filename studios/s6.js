// Studio Sheet Q1
function my_map(f, xs) {
    return accumulate((x, y) => pair(f(x), y), null, xs);
}

display_list(my_map(x => x + 1, list(1,2,3)), "Q1 test:");


// Studio Sheet Q2
function remove_duplicates(lst) {
    return is_null(lst)
           ? null
           : append(list(head(lst)), remove_duplicates(filter(x => x !== head(lst), lst)));
}

display_list(remove_duplicates(list(1,2,1,1,3)), "Q2 test:");


// Studio Sheet Q3
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x, tail(coins));

        // Combinations that do not use the head coin 
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins));

        // Combinations that use the head coin.
        const combi_C = map(y => pair(head(coins), y), 
                            combi_B);
                             
        return append(combi_A, combi_C);
    }
}

display_list(makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50)), "Q3 test:");

// In-class Q1
function remove_duplicates_acc(lst) {
    const f = (x, y) => is_null(member(x, y))
                        ? pair(x, y)
                        : y;
    return accumulate(f, null, lst);
}

display_list(remove_duplicates_acc(list(1,2,1,1,3)), "Extra Q1 test:");

// In-class Q2
function subsets(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        const combi_A = subsets(tail(xs));
        const combi_B = map(y => append(list(head(xs)), y), 
                            combi_A);
        return append(combi_A, combi_B);
    }
}

display_list(subsets(list(1,2,3)), "Extra Q2 test:");

// In-class Q3
function permutations(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        return map(x => map(y => pair(x, y), 
                            permutations(filter(n => n !== x, xs))), 
                   xs);
    }
}

display_list(permutations(list(1,2,3)), "Extra Q3 test:");


