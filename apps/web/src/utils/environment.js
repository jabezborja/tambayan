let inProduction = false;

if (process && process.env.NODE_ENV === 'production') {
    inProduction = true;
}

export { inProduction };