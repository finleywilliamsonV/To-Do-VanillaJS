const fs = require('fs');
const utf8 = { encoding: 'utf8' };

function view(templateName, values, res) {
	// read from the template files
	let fileContents = fs.readFileSync(`./views/${templateName}.html`, utf8);

	// merge in values

	// write to the response
	return res.write(fileContents);
}

// function that imports css
function css(fileName, res) {
	// read the file
	let fileContents = fs.readFileSync(`.${fileName}`, { encoding: 'utf8' });
	// write out to the response
	res.writeHead(200, { 'Content-Type': 'text/css' });
	res.write(fileContents);
}

// function that imports static js
function js(fileName, res) {
	// read the file
	console.log('FOR ERRORS:', fileName);
	let fileContents = fs.readFileSync(`./assets/js${fileName}`, { encoding: 'utf8' });
	// write out to the response
	res.writeHead(200, { 'Content-Type': 'text/javascript' });
	res.write(fileContents);
}

module.exports.view = view;
module.exports.css = css;
module.exports.js = js;
