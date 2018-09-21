const renderer = require('./renderer');
const queryString = require('querystring');
const fs = require('fs');
const path = require('path');

// handle HTTP route GET for index
function index(req, res) {
	// log request info
	console.log(`// beginning router.index(req, res)`);
	console.log('router.index() -> Request URL: ' + req.url);
	console.log('router.index() -> Request Method: ' + req.method);

	if (req.url === '/') {
		if (req.method.toUpperCase() === 'GET') {
			// set header info
			res.statusCode = 200;
			res.setHeader('Content-type', 'text/html');
			renderer.view('header', {}, res);
			renderer.view('main', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		}
	}
}

// serve static styles
function style(req, res) {
	if (req.url.indexOf('.css') !== -1) {
		console.log('router.style() -> CSS Request URL: ' + req.url);
		console.log('router.style() -> CSS Request Method: ' + req.method);

		renderer.css(req.url, res);
		res.end();
	}
}

// serve static js
function javascript(req, res) {
	if (req.url.indexOf('.js') !== -1) {
		console.log('router.javascript() -> JS Request URL: ' + req.url);
		console.log('router.javascript() -> JS Request Method: ' + req.method);

		renderer.js(req.url, res);
		res.end();
	}
}

// function javascript(req, res) {
// 	const regExr = /.js(.gz)?$/g;
// 	const assetsPath = path.resolve('./assets');

// 	if (req.url.match(regExr)) {
// 		const filePath = path.join(assetsPath, 'js', req.url);

// 		fs.readFile(filePath, (err, content) => {
// 			if (err) {
// 				if (err.code === 'ENOENT') {
// 					console.log('ERROR NO FILE');
// 					console.log(err);
// 				} else {
// 					res.writeHead(500);
// 					res.end('No file read, check with site admin');
// 					res.end();
// 				}
// 			} else {
// 				res.writeHead(200, { 'Content-Type': 'text/javascript' });
// 				res.write(content, 'utf-8');
// 				res.end();
// 			}
// 		});
// 	}
// }

module.exports.index = index;
module.exports.style = style;
module.exports.javascript = javascript;
