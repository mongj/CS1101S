function copy(A, B) {
    const len = array_length(A);
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
}

function merge_sort(A) {
    function merge_sort_helper(A, low, high) {
        if (low < high) {
            const mid = math_floor((low + high) / 2);
            merge_sort_helper(A, low, mid);
            merge_sort_helper(A, mid + 1, high);
            merge(A, low, mid, high);
        }
    }
    
    function merge(A, low, mid, high) {
        const B = [];
        let left = low;
        let right = mid + 1;
        let Bidx = 0;
        
        while (left <= mid && right <= high) {
            if (A[left] <= A[right]) {
                B[Bidx] = A[left];
                left = left + 1;
            } else {
                B[Bidx] = A[right];
                right = right + 1;
            }
            Bidx = Bidx + 1;
        }
        
        while (left <= mid) {
            B[Bidx] = A[left];
            Bidx = Bidx + 1;
            left = left + 1;
        }   
        while (right <= high) {
            B[Bidx] = A[right];
            Bidx = Bidx + 1;
            right = right + 1;
        }
        
        for (let k = 0; k < high - low + 1; k = k + 1) {
            A[low + k] = B[k];
        }
    }
    
    merge_sort_helper(A, 0, array_length(A) - 1);
}

function binary_search(A, v) {
    let low = 0;
    let high = array_length(A) - 1;

    while (low <= high) {
        const mid = math_floor((low + high) / 2 );
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return (low <= high);
}

function make_search(A) {
    const B = [];
    copy(A, B);
    merge_sort(B);
    return x => binary_search(B, x);
}


const my_array = [3,41,20,1,5,16,4,0,14,6,17,8,4,0,2];
const my_search = make_search(my_array);

for (let i = 0; i < 1000; i = i + 1) {
    my_search(math_floor(math_random() * 50));
}

display("done");

