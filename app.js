const router = require('./router');

// Create Web Server
const http = require('http');

const server = http.createServer((req, res) => {
	// Log Request URL
	console.log('\n_______________________________________________');
	console.log(`\napp.js -> Request URL: ${req.url}`);
	console.log('_______________________________________________');

	// begin style route
	console.log('\nStarting style route');
	router.style(req, res);

	// begin js route
	console.log('\nStarting js route');
	router.javascript(req, res);

	// begin index route
	console.log('\nStarting generator route');
	router.index(req, res);
});

// designate port
const hostname = 'localhost';
const port = process.env.PORT || '3000';

// listen to port
server.listen(port, () => {
	console.log(`\n\n                  TO-DO LIST (VANILLA JS)\n\n`);
	console.log(`   ***   Server running at http://${hostname}:${port}/  ***`);
});
