// Q1
function my_map(f, xs) {
    return accumulate((x, y) => pair(f(x), y), null, xs);
}

//my_map(x => x + 1, list(1,2,3));


// Q2
function remove_duplicates(lst) {
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

remove_duplicates(list(1,2,1,1,3));