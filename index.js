function getFileSize (filename, callback) {
	var fs = require('fs');
	callback (fs.statSync (filename).size);
};

function getLM (filename, callback) {
	var fs = require('fs');
	var util = require('util');
	callback (new Date(util.inspect(fs.statSync(filename).mtime)));
};

function checkDirectory (directory) {
	var fs = require('fs');
	fs.exists(directory, function(exists) {
		if (exists) {
			return true;
		}
		return false;
	});
};

function readDirectory (directory, extension, callback) {
	var fs = require('fs');
	var array = [];
	fs.readdir(directory, (err, files) => {
		for (var i=0; i<files.length; i++) {
			if ((extension.localeCompare('') == 0) || (files[i].split('.')[1].localeCompare(extension) == 0)) {
				var fileArray = [];
				fileArray.push (files[i]);
				getFileSize(directory+'/'+files[i], function(size) {
					fileArray.push (size);
				});
				getLM(directory+'/'+files[i], function(lm) {
					fileArray.push (lm);
				});
				array.push (fileArray);
			}
		}
		callback(array);
	});
};

function sortName (a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function sortSize (a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function sortLM(a, b) {
    if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}

exports.getFile = function(directory, extension, parameter, asc, callback) {
	var arrayFiles = [];
	
	if (checkDirectory(directory) == false) {
		throw Error('The directory is not exist.');	
	}
	
	if (!((parameter.localeCompare('lm') == 0) || (parameter.localeCompare('size') == 0) || (parameter.localeCompare('name') == 0))) {
		throw Error('The parameter was incorrect.');
	}
	
	if (!((asc == true) || (asc == false))) {
		throw Error('The parameter asc is incorrect.');
	}
	
	readDirectory (directory, extension, function(array) {
		switch (parameter) {
			case 'name':
				array.sort(sortName);
				break;
			case 'size':
				array.sort(sortSize);
				break;
			case 'lm':
				array.sort(sortLM);
				break;
		}
		
		if (asc == true) {
			callback (array[0][0]);
		} else {
			callback (array[array.length-1][0]);
		}
	});
};