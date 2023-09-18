// Q1
function my_map(f, xs) {
    return accumulate((x, y) => pair(f(x), y), null, xs);
}

//my_map(x => x + 1, list(1,2,3));


// Q2
function remove_duplicatess(lst) {
    function is_in_list(x, lst) {
        return is_null(lst)
               ? false
               : x === head(lst)
               ? true
               : is_in_list(x, tail(lst));
    }

    return filter(is_in_list, lst); // is_in_list should take in 2 params
}

// works but doesn't use filter
function remove_duplicates(ref) {
    function is_in_list(x, lst) {
        return is_null(lst)
               ? false
               : x === head(lst)
                   ? true
                   : is_in_list(x, tail(lst));
    }
    
    function remove_duplicates_iter(ref, tgt) {
        return is_null(ref)
               ? tgt
               : is_in_list(head(ref), tgt)
                   ? remove_duplicates_iter(tail(ref), tgt)
                   : remove_duplicates_iter(tail(ref), append(list(head(ref)), tgt));   
    }
    
    return remove_duplicates_iter(ref, null);
}

// pred takes in 1 arg (an element in list) and return true or false
// pred should return true if the element in head does not appear in tail, and false otherwise

// remove_duplicates(list(1,2,1,1,3));


// Q3
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
        const combi_B = null;

        // Combinations that use the head coin.
        const combi_C = map(y => pair(head(coins), y), 
                            makeup_amount(x - head(coins), tail(coins)));
                             
        return append(combi_A, combi_C);
    }
}

display_list(makeup_amount(2, list(1, 5, 1, 1)));
// display_list(makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50)));
// Result: list(list(20, 1, 1), list(10, 5, 1, 5, 1), list(1, 20, 1),
//              list(1, 20, 1), list(1, 10, 5, 5, 1), 
//              list(1, 10, 5, 1, 5))
