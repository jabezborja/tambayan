const truncate = (str) => {
    var n = 50;

    if (n > str.length) return str;

    return str.slice(0, n-1) + '&hellip;';
}

export { truncate }