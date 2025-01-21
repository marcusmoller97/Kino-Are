function errorHandler (err, req, res, next) {
    console.log("Här är jag")
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
