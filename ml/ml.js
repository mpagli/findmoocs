
var consts = require('../controllers/variables.js');

var subprocess = require('child_process');

exports.lemmatize = function(pathToText, callback) {

	var cmdSNLP = consts.get_cmdSNLP(pathToText);

	subprocess.exec(cmdSNLP, function(err, stdout, stderr){
    	if(err) return console.log(err);

    	return callback();
	});
}

exports.LDA_inference = function(pathToText, callback) {

	var cmdMalletData = consts.get_cmdMalletData(pathToText);
  	var cmdMalletLDA = consts.get_cmdMalletLDA(pathToText);

	subprocess.exec(cmdMalletData, function(err, stdout, stderr){
        if(err) return console.log(err);

        subprocess.exec(cmdMalletLDA, function(err, stdout, stderr){
			if(err) return console.log(err);

			return callback();
        });
    });
};