function fib1(n) {
    const a = [0, 1];
    for (let i = 2; i <= n; i = i + 1) {
        a[i] = a[i - 1] + a[i - 2];
    }
    return a[n];
}

display(fib1(0));

function fib2(n) {
    const a = [0, 1];
    for (let i = 2; i <= n; i = i + 1) {
        a[1] = a[0] + a[1];
        a[0] = a[1] - a[0];
    }
    return n === 0 ? a[0] : a[1];
}

display(fib2(8));


// 0
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21