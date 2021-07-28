function indexHandler(req, res) {
    res.render('index', { title: 'Express' });
}

module.exports = {
    indexHandler,
}