function errorHandler (err, _req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500)
    const status = res.statusCode
    res.render("error", { status });
}

export {
    errorHandler
}
