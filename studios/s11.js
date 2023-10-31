function add_streams(s1, s2) {
    return is_null(s1)
        ? s2
        : is_null(s2)
            ? s1
            : pair(head(s1) + head(s2),
                   () => add_streams(stream_tail(s1),
                                     stream_tail(s2)));
}

function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}

const add_series = add_streams;
const scale_series = scale_stream;

function negate_series(s) {
    return scale_series(-1, s);
}

function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

function coeffs_to_series(list_of_coeffs) {
    const zeros = pair(0, () => zeros);
    function iter(list) {
        return is_null(list)
            ? zeros
            : pair(head(list),
                   () => iter(tail(list)));
    }
    return iter(list_of_coeffs);
}

function fun_to_series(fun) {
    return stream_map(fun, integers_from(0));
}

const alt_ones_1 = pair(1, () => pair(-1, () => alt_ones_1));
const alt_ones_2 = pair(1, () => scale_series(-1, alt_ones_2));
const alt_ones_3 = pair(1, () => negate_series(alt_ones_3));

const zeroes_1 = pair(0, () => subtract_series(alt_ones_1, alt_ones_1));
const zeroes_2 = pair(0, () => add_series(alt_ones_1, scale_series(-1, alt_ones_1)));
const zeroes_3 = pair(0, () => add_series(alt_ones_1, negate_series(alt_ones_1)));
const zeroes_4 = pair(0, () => add_series(alt_ones_1, stream_tail(alt_ones_1)));

const ones = pair(1, () => ones);
const pos_integers = pair(1, () => add_streams(ones, pos_integers));

eval_stream(pos_integers, 10);