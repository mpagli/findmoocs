#!/bin/bash

#Necessary for polymer
echo Fetching dependencies with bower
bower update

#Necessary for the ML backend
mkdir libs
mkdir temp

    #Fetch the stanford NLP toolkit
echo Fetching mallet NLP library
wget http://nlp.stanford.edu/software/stanford-corenlp-full-2015-04-20.zip
unzip stanford-corenlp-full-2015-04-20.zip -d libs/
rm stanford-corenlp-full-2015-04-20.zip

    #Fetch mallet
echo Fetching the stanford NLP toolkit
wget http://mallet.cs.umass.edu/dist/mallet-2.0.6.tar.gz
tar xvzf mallet-2.0.6.tar.gz
mv mallet-2.0.6 libs/
rm mallet-2.0.6.tar.gz



