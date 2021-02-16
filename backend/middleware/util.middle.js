exports.logger = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);

    return next();
}