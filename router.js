const renderer = require('./renderer');

/**
 * handles HTTP route GET for index
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
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
      renderer.view('header', res);
      renderer.view('main', res);
      renderer.view('footer', res);
      res.end();
    }
  }
}

/**
 * serves static styles
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function style(req, res) {
  if (req.url.indexOf('.css') !== -1) {
    console.log('router.style() -> CSS Request URL: ' + req.url);
    console.log('router.style() -> CSS Request Method: ' + req.method);

    renderer.css(req, res);
    res.end();
  }
}

/**
 * serves static javascript
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function javascript(req, res) {
  if (req.url.indexOf('.js') !== -1) {
    console.log('router.javascript() -> JS Request URL: ' + req.url);
    console.log('router.javascript() -> JS Request Method: ' + req.method);

    renderer.js(req, res);
    res.end();
  }
}

/**
 * serves static images
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function image(req, res) {
  if (req.url.indexOf('.png') !== -1) {
    console.log('router.img() -> Image Request URL: ' + req.url);
    console.log('router.img() -> Image Request Method: ' + req.method);

    renderer.img(req, res);
    res.end();
  }
}

module.exports.index = index;
module.exports.style = style;
module.exports.javascript = javascript;
module.exports.image = image;
