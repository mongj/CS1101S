// Q1
function my_map(f, xs) {
    return accumulate((x, y) => pair(f(x), y), null, xs);
}

//my_map(x => x + 1, list(1,2,3));


// Q2

// works but doesn't use filter
function remove_duplicatess(ref) {
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

// function remove_duplicates(lst) {
//     function not_in_tail(h, t) {
//         return is_null(filter(x => h === x, t));
//     }
//     return is_null(lst)
//           ? null
//           : not_in_tail(head(lst), tail(lst))
//              ? append(list(head(lst)),remove_duplicates(tail(lst)))
//              : remove_duplicates(tail(lst));
// }

function remove_duplicates(lst) {
    return is_null(lst)
           ? null
           : append(list(head(lst)), remove_duplicates(filter(x => x !== head(lst), lst)));
}

remove_duplicates(list(1,2,1,1,3));


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

//display_list(makeup_amount(2, list(1, 5, 1, 1)));
// display_list(makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50)));
// Result: list(list(20, 1, 1), list(10, 5, 1, 5, 1), list(1, 20, 1),
//              list(1, 20, 1), list(1, 10, 5, 5, 1), 
//              list(1, 10, 5, 1, 5))


function accumulate(f, init, lst) {
    return is_null(lst)
           ? init
           : f(head(lst), accumulate(f, init, tail(lst)));
}

accumulate((x, y) => x + y, 0, list(1,2,3));

// function filter(f, lst) {
//     function f(x, y) {
//         return pair(x, y);
//     }
//     return is_null(lst)
//           ? null
//           : accumulate(f, null, lst);
// }

function filter(f, lst) {
    return is_null(lst)
           ? null
           : f(head(lst))
           ? pair(head(lst), filter(f, tail(lst)))
           : filter(f, tail(lst));
}

filter(x => x > 2, list(1,2,3,4,5));
