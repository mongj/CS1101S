function memo_fun(fun) {
    let already_run = false;
    let result = undefined;

    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}

function add_streams(s1, s2) {
    return is_null(s1)
        ? s2
        : is_null(s2)
        ? s1
        : pair(head(s1) + head(s2),
              () => add_streams(stream_tail(s1), 
                                 stream_tail(s2)));
}

function mul_streams(s1, s2) {
    return is_null(s1)
        ? s2
        : is_null(s2)
        ? s1
        : pair(head(s1) * head(s2),
              () => mul_streams(stream_tail(s1), 
                                 stream_tail(s2)));
}

function scale_stream(s, f) {
    return stream_map(x => x * f, s);
}

function zip_streams(s1, s2) {
    return is_null(s1) ? s2
         : is_null(s2) ? s1
         : pair(head(s1),
                () => zip_streams(s2, stream_tail(s1))));
}

function zip_list_of_streams(xs) {
    return is_null(xs) ? xs
         : accumulate((h, acc) => () => pair(head(h), acc),
                      () => zip_list_of_streams(map(x => stream_tail(x), xs)),
                      xs)();
}

function partial_sums(s) {
    const loop = pair(head(s), () => loop);
    return is_null(s) ? s
         : pair(head(s),
                () => add_streams(loop, partial_sums(stream_tail(s))));
}

function partial_sums_alt(s) {
    return is_null(s) ? s
         : pair(head(s),
                () => stream_map(x => x + head(s),
                                 partial_sums(stream_tail(s))));
}

const integers = integers_from(1);
const ones = pair(1, () => ones);
const xs = list(integers_from(10),integers_from(100),integers_from(1000));

//eval_stream(zip_list_of_streams(xs), 9);

eval_stream(partial_sums(integers),10);