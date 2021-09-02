module.exports = function (app) {
    console.log('Loading / items')
    app.get('/', function (req, res) {
        res.render('index.html')
    })
}