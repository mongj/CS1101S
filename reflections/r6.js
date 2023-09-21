// https://canvas.nus.edu.sg/courses/45621/files/folder/Reflection%20Sheets?preview=2486040

function insert_cmp(x, xs, cmp) {
    return is_null(xs) 
           ? list(x)
           : cmp(x, head(xs)) 
           ? pair(x, xs)
           : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}

function insertion_sort_cmp(xs, cmp) {
    return is_null(xs) 
           ? xs
           : insert_cmp(head(xs), 
                        insertion_sort_cmp(tail(xs), cmp),
                        cmp);
}

// Q1
const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7);

// (a)
insertion_sort_cmp(xs, (x, y) => x < y);
// Result: list(1, 2, 3, 4, 5, 6, 6, 7, 8, 9)

// (b)
insertion_sort_cmp(xs, (x, y) => x > y);
// Result: list(9, 8, 7, 6, 6, 5, 4, 3, 2, 1)

// (c)
insertion_sort_cmp(xs, (x, y) => false);
// Result: list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6)

// (d)
insertion_sort_cmp(xs, (x, y) => x % 2 === 0
                                 ? x < y
                                 : y % 2 === 0
                                    ? false
                                    : x > y);
// Result: list(2, 4, 6, 6, 8, 9, 7, 5, 3, 1)


// Q2

// (a) theta(n)
// (b) theta(nlog(n))   -- 2log(n)(2n + 1)

