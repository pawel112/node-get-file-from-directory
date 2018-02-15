# Node get file-from-directory
Get the file from directory with the largest / smallest size, last modified or name.

# Readme

Compare files by using protractor (is not needed SSH or FTP connection). On server use the protractor-cmp-files-server module.

# Function

    getFile (directory, extension, parameter, asc, callback);

---


directory - example: '/home/username/Desktop/directory'

extension - example: 'txt' or '' (any extension)

parameter - one from 'lm' (last modified), 'name' (file name) or 'size' (size of file)

asc       - true get oldest file, size with smallest size or closest to the beginning of the alphabet

callback  - function done after get file example: console.log (file);

# Example

	var getFileFromDirectory = require('node-get-file-from-directory');
	getFileFromDirectory.getFile ('/home/username/Desktop/directory', '', 'lm', false, function(file) {
		console.log (file);    
	});
