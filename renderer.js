const fs = require('fs');
const utf8 = { encoding: 'utf8' };
const path = require('path');

function view(templateName, values, res) {
	// read from the template files
	let fileContents = fs.readFileSync(`./views/${templateName}.html`, utf8);

	// merge in values

	// write to the response
	return res.write(fileContents);
}

// function that imports css
function css(req, res) {
	// get file path
	const assetsPath = path.resolve('./styles');
	const filePath = path.join(assetsPath, req.url);
	// read the file
	let fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
	// write out to the response
	res.writeHead(200, { 'Content-Type': 'text/css' });
	res.write(fileContents);
}

// function that imports static js
function js(req, res) {
	// get file path
	const assetsPath = path.resolve('./assets');
	const filePath = path.join(assetsPath, 'js', req.url);
	// read the file
	let fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
	// write out to the response
	res.writeHead(200, { 'Content-Type': 'text/javascript' });
	res.write(fileContents);
}

// function that imports static images
function img(req, res) {
	// get file path
	const assetsPath = path.resolve('./assets');
	const filePath = path.join(assetsPath, 'img', req.url);
	// read the file
	let fileContents = fs.readFileSync(filePath);
	// write out to the response
	res.writeHead(200, { 'Content-Type': 'image/png' });
	res.write(fileContents);
}

module.exports.view = view;
module.exports.css = css;
module.exports.js = js;
module.exports.img = img;
