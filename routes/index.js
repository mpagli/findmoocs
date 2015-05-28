var express = require('express');
var router = express.Router();
var controller = require('../controllers/moocsController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/api/getTopicsList', function(req, res){
  controller.get_topics_list(res);
});

router.post('/api/getCloseMoocs', function(req, res, next){
  var moocId = req.body._id;
  controller.get_close_moocs_from_id(moocId, 6, res);
});

router.post('/api/getMoocsFromText', function(req, res, next){
  var text = req.body.text;
  controller.get_moocs_from_text(text, 6, res);
});

router.post('/api/getMoocsFromTopics', function(req, res, next){
  var topicsValues = req.body;
  controller.get_moocs_from_topics(topicsValues, 12, res);
});

