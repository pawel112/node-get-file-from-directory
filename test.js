var cmp = require('./index.js');
cmp.getFile ('/home/pawel/Desktop/test', '', 'lm', false, function(file) {
	console.log (file);
});