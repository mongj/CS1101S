// Q1
function change(x, new_value) {
    x = new_value;
}

function change_compound(x, new_value) {
    set_head(x, new_value);
}

let x = 0;
let y = list(0);
change(x, 1);
change_compound(y, 1);

display(x, "x:");
display(y, "y:");

// Q2
function d_filter(pred, xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        if (pred(head(xs))) {
            set_tail(xs, d_filter(pred, tail(xs)));
        } else {
            xs = d_filter(pred, tail(xs));
        }
        return xs;
    }
}

const L = list(1, 2, 3, 4, 5, 6, 7, 8, 9, 11);
const L_filterd = d_filter(x => x % 2 === 0, L); // returns [2, [4, [6, [8, null]]]]
display(L);
display(L_filterd);