

var pathToSNLP = './libs/stanford-corenlp-full-2015-04-20/';

var pathToMallet = './libs/mallet-2.0.6/bin/mallet ';

module.exports = {

    numTopics : 140,

    topicsList : [
        {"name": "mechanics", "ids": [62, 63, 121]},
        {"name": "differential equations", "ids": [99]}, 
        {"name": "web development", "ids": [89]},
        {"name": "art", "ids": [9, 24, 40, 48, 61, 120]},
        {"name": "computer architecture", "ids": [138]},
        {"name": "cinema", "ids": [61]},
        {"name": "computer networks", "ids": [57, 113, 134]},
        {"name": "data science", "ids": [96, 114]},
        {"name": "quantum mechanics", "ids": [128]},
        {"name": "engineering", "ids": [12, 59, 135]},
        {"name": "design", "ids": [59]},
        {"name": "artificial intelligence", "ids": [45, 76]},
        {"name": "cosmology", "ids": [51, 81]},
        {"name": "image processing", "ids": [50]},
        {"name": "social sciences", "ids": [17, 35, 91, 100]},
        {"name": "logic", "ids": [77]},
        {"name": "management", "ids": [4, 49, 52, 55, 88, 105]},
        {"name": "psychology", "ids": [111]},
        {"name": "democracy", "ids": [17, 91]},
        {"name": "music production", "ids": [24]},
        {"name": "sports", "ids": [43]},
        {"name": "risk management", "ids": [52]},
        {"name": "genetic", "ids": [82, 115]},
        {"name": "music", "ids": [9, 40, 48, 120]},
        {"name": "computer science", "ids": [0, 5, 14, 19, 23, 29, 30, 38, 45, 47, 50, 56, 57, 69, 73, 76, 80, 85, 89, 92, 96, 104, 107, 110, 112, 113, 114, 118, 119, 134, 138]},
        {"name": "natural language processing", "ids": [23, 69]},
        {"name": "medicine", "ids": [7, 13, 32, 71, 97, 116, 123]},
        {"name": "mathematics", "ids": [1, 2, 18, 22, 28, 33, 53, 77, 99, 102, 131]},
        {"name": "android", "ids": [0]},
        {"name": "operating systems", "ids": [29]},
        {"name": "calculus", "ids": [1, 28, 53, 131]},
        {"name": "nutrition", "ids": [106]},
        {"name": "biology", "ids": [3, 36, 66, 72, 82, 101, 106, 115]},
        {"name": "literature", "ids": [27, 54, 65, 93]},
        {"name": "signal processing", "ids": [68, 70, 139]},
        {"name": "finance", "ids": [34, 58, 95, 126, 133]},
        {"name": "geology", "ids": [11, 124]},
        {"name": "philosophy", "ids": [74]},
        {"name": "global warming", "ids": [11]},
        {"name": "IT security", "ids": [5, 19]},
        {"name": "machine learning", "ids": [80, 92]},
        {"name": "bioinformatics", "ids": [36]},
        {"name": "neuroscience", "ids": [3, 101]},
        {"name": "astronomy", "ids": [87]},
        {"name": "electronics", "ids": [98, 108, 130]},
        {"name": "animals", "ids": [25, 79]},
        {"name": "parallel programming", "ids": [107]},
        {"name": "epidemics", "ids": [32]},
        {"name": "linear algebra", "ids": [102]},
        {"name": "video games", "ids": [110]},
        {"name": "programming", "ids": [14, 30, 47, 56, 104, 118]},
        {"name": "software testing", "ids": [38]},
        {"name": "algorithms", "ids": [73, 85, 112, 119]},
        {"name": "architecture", "ids": [39]},
        {"name": "healthcare", "ids": [7]},
        {"name": "electrical engineering", "ids": [68, 70, 98, 108, 130, 139]},
        {"name": "probability theory", "ids": [2, 18, 22, 33]},
        {"name": "chemistry", "ids": [21, 75, 127]},
        {"name": "physics", "ids": [37, 51, 62, 63, 81, 87, 121, 128]},
        {"name": "history", "ids": [10, 46, 67, 86]}
    ],

    get_cmdSNLP : function(pathToText){
        return 'java '+
            '-cp '+
            pathToSNLP+'stanford-corenlp-3.5.2.jar:'+
            pathToSNLP+'stanford-corenlp-3.5.2-models.jar:'+
            pathToSNLP+'xom.jar:'+
            pathToSNLP+'joda-time.jar:'+
            pathToSNLP+'jollyday.jar:'+
            pathToSNLP+'ejml-3.5.2.jar '+
            '-Xmx200m '+
            'edu.stanford.nlp.pipeline.StanfordCoreNLP '+
            '-annotators '+
            'tokenize,ssplit,pos,lemma '+
            '-outputDirectory '+
            './temp/ '+
            '-file '+
            pathToText+'.txt '+
            '-replaceExtension';
    },

    get_cmdMalletData : function(pathToText){
        return pathToMallet + 
            'import-file '+
            '--input '+
            pathToText+'.filtered '+
            '--output '+
            pathToText+'.mallet '+
            '--use-pipe-from '+
            './ml/LDA_model/topic-input.mallet ';
    },

    get_cmdMalletLDA : function(pathToText){ 
        return pathToMallet + 
            'infer-topics '+
            '--inferencer '+
            './ml/LDA_model/inferencer '+
            '--input '+
            pathToText+'.mallet '+
            '--output-doc-topics '+
            pathToText+'theta.txt';
    },

    posToKeep : {
        'FW'  :true,
        'JJ'  :true,
        'JJR' :true,
        'JJS' :true,
        'NN'  :true,
        'NNP' :true,
        'NNPS':true,
        'NNS' :true,
        'RBR' :true,
        'RBS' :true,
        'VB'  :true,
        'VBD' :true,
        'VBG' :true,
        'VBN' :true,
        'VBP' :true,
        'VBZ' :true        
    },

    stopVerbList : {
        'mean'  :true,
        'get'   :true,
        'use'   :true,
        'be'    :true,
        'have'  :true,
        'do'    :true,
        'see'   :true,
        'look'  :true,
        'use'   :true,
        'welcome':true,
        'come'  :true,
        'know'  :true,
        'want'  :true,
        'think' :true,
        'need'  :true,
        'go'    :true,
        'let'   :true
    }

};