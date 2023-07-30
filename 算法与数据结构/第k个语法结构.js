var kthGrammar = function(n, k) {
    if (n === 1) {
        return 0;
    }
    return (k & 1) ^ 1 ^ kthGrammar(n - 1, (k + 1) / 2);
};