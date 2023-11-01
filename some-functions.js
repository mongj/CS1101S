let stack = [];

function add_to_stack(v, stack) {
    stack[array_length(stack)] = v;
}

function pop_from_stack(n, stack) {
    const new_stack = [];
    for (let i = 0; i < array_length(stack) - n; i = i + 1) {
        new_stack[i] = stack[i];
    }
    return new_stack;
}

function flatten_arr(src, dest) {
    for (let i = 0; i < array_length(src); i = i + 1) {
        if (is_array(src[i])) {
            flatten_arr(src[i], dest);
        } else {
            dest[array_length(dest)] = src[i];
        }
    }
    return new_arr;
}

const arr = [[1,2,3],4,[[5,6],[7,[8,[9]]]]];
const new_arr = [];
flatten_arr(arr, new_arr);
new_arr;