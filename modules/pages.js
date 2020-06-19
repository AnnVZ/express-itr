var path = require('path');

exports.sendHTML = function (res, html) {
    res.sendFile(path.join(__dirname, './../public', html));
}

exports.sendError = function (res, text) {
    let bootstrap = '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">';
    res.send(bootstrap + '<h3>' + text + '</h3><br><a href="/">Back</a>');
}