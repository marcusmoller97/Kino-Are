function errorHandler (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).render("error");
}

export {
    errorHandler
}