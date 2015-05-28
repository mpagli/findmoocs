
var mongoose = require('mongoose');
var Course = mongoose.model('Course');

var fs = require('fs');

var math = require('mathjs')

var libxmljs = require("libxmljs");

var consts = require('../controllers/variables.js');

var ml = require('../ml/ml.js');

function extract_theta(data){
  var thetaVec = new Array(consts.numTopics);
  var theta = data.trim('\n').split(' ');
  theta = theta.slice(theta.length-(2*consts.numTopics), theta.length);
  var topics = [];
  for(var i=0 ; i<consts.numTopics; i++){
    var pt1 = i*2;
    var pt2 = pt1+1;
    var topicRef = parseInt(theta[pt1]);
    var prob = parseFloat(theta[pt2]);
    thetaVec[topicRef] = prob;
  }
  return thetaVec;
}

function filter_xml(data){

  var doc = libxmljs.parseXmlString(data);
  var filteredData = '';

  lemmas = doc.find('//lemma');
  poss = doc.find('//POS');     

  for(idx in lemmas){

    lemma = lemmas[idx].text();
    pos = poss[idx].text();

    if(pos in consts.posToKeep){
      if(!(pos.substr(0, 1) == 'VB' && lemma in consts.stopVerbList)){
        filteredData += lemma+' ';
      }
    }
  }
  return filteredData;
}

var get_close_moocs_from_theta = function(theta, numToReturn, res){

  var thetaVecNorm = math.norm(theta);

  Course.find().lean().exec(function (err, courses) {
    if (err) return console.error(err);

    for(idx in courses){
      cosine = math.dot(courses[idx].theta,theta)/(math.norm(courses[idx].theta)*thetaVecNorm)
      courses[idx].score = cosine;
    }

    courses.sort(function(a,b){
      return b.score - a.score;
    });

    for(i=0; i<6; ++i){
      delete courses[i].theta
    }

    res.send(courses.slice(0,numToReturn));
  });
};

module.exports.get_moocs_from_text = function(text, numToReturn, res) {

  var timestamp = new Date().getTime();
  var pathToText = './temp/'+timestamp;

  fs.writeFile(pathToText+'.txt', text, function (err) {
    if (err) return console.log(err);
  });

  ml.lemmatize(pathToText, function(){

    fs.readFile( pathToText+'.xml', function(err, data) {

      if(err) return console.log(err);

      var filteredData = filter_xml(data);

      if(filteredData == "") return res.send([]);

      fs.writeFile(pathToText+'.filtered', filteredData, function (err) {
        if (err) return console.log(err);
      });

      ml.LDA_inference(pathToText, function(){

        fs.readFile(pathToText+'theta.txt', 'utf-8', function(err, data){
          if(err) return console.log(err);

          var thetaVec = extract_theta(data);

          get_close_moocs_from_theta(thetaVec, 6, res);
        });
      });
    });
  });
}

module.exports.get_moocs_from_topics = function(topicsValues, numToReturn, res) {

  topicsValues.sort(function(a,b){
    return b.ids.length - a.ids.length;
  });

  var temp = {};
  var topicsIds = [];
  var topicsVal = [];

  for(idx in topicsValues){
    for(j in topicsValues[idx].ids){
      temp[topicsValues[idx].ids[j].toString()] = topicsValues[idx].value;
    }
  }

  for (var key in temp) {
    if (temp.hasOwnProperty(key)) {
      topicsIds.push(key);
      topicsVal.push(temp[key]);
    }
  }
  var reqNorm = math.norm(topicsVal);

  Course.find().lean().exec(function (err, courses) {

    if(err) console.log(err);

    for(idx in courses){
      var thetaVec = [];
      for(j in topicsIds){
        thetaVec.push(courses[idx].theta[topicsIds[j]]);
      }
      var thetaVecNorm = math.norm(thetaVec);

      cosine = math.dot(topicsVal,thetaVec)/reqNorm;
      courses[idx].score = cosine;
    }

    courses.sort(function(a,b){
      return b.score - a.score;
    });

    for(i=0; i<numToReturn; ++i){
      delete courses[i].theta
    }

    res.send(courses.slice(0,numToReturn));

  });
};

module.exports.get_close_moocs_from_id = function(moocId, numToReturn, res) {

  var thetaVec = undefined;

  Course.findById(moocId, function(err, found){
    if(err) return console.log(err);

    thetaVec = found.theta;

    var thetaVecNorm = math.norm(thetaVec);

    get_close_moocs_from_theta(thetaVec, numToReturn, res);
  });
};

module.exports.get_topics_list = function(res) {
 
  topicsList = consts.topicsList; 

  topicsList.sort(function(a,b){
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  });

  res.send(topicsList);
};


