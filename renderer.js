const fs = require('fs');
const utf8 = {encoding: 'utf8'};
const path = require('path');

/**
 * Writes a specified view to the response object.
 * @param {String} templateName - Name of template to view
 * @param {Object} res - Response object
 * @return {Function} - writes the file contents to the response object
 */
function view(templateName, res) {
  // read from the template files
  let fileContents = fs.readFileSync(`./views/${templateName}.html`, utf8);

  // write to the response
  return res.write(fileContents);
}


/**
 * Imports css and writes to response object.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function css(req, res) {
  // get file path
  const assetsPath = path.resolve('./styles');
  const filePath = path.join(assetsPath, req.url);
  // read the file
  let fileContents = fs.readFileSync(filePath, {encoding: 'utf8'});
  // write out to the response
  res.writeHead(200, {'Content-Type': 'text/css'});
  res.write(fileContents);
}

/**
 * Imports javascript and writes to response object.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function js(req, res) {
  // get file path
  const assetsPath = path.resolve('./assets');
  const filePath = path.join(assetsPath, 'js', req.url);
  // read the file
  let fileContents = fs.readFileSync(filePath, {encoding: 'utf8'});
  // write out to the response
  res.writeHead(200, {'Content-Type': 'text/javascript'});
  res.write(fileContents);
}

/**
 * Imports static images and writes to response object.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function img(req, res) {
  // get file path
  const assetsPath = path.resolve('./assets');
  const filePath = path.join(assetsPath, 'img', req.url);
  // read the file
  let fileContents = fs.readFileSync(filePath);
  // write out to the response
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.write(fileContents);
}

module.exports.view = view;
module.exports.css = css;
module.exports.js = js;
module.exports.img = img;
