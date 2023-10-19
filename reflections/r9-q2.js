function fib1(n) {
    const a = [0, 1];
     for (let i = 2; i < n; i = i + 1) {
         a[i] = a[i - 1] + a[i - 2];
     }
     return a[n - 1];
}

display(fib1(8));

function fib2(n) {
    const a = [0, 1];
    for (let i = 2; i < n; i = i + 1) {
        const newfib = a[0] + a[1];
        a[0] = a[1];
        a[1] = newfib;
    }
    return a[1];
}

display(fib2(8));