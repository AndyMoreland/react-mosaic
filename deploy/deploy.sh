# !/bin/sh
#
# Deploy script
#

correctKey=$(cat deployKey.txt)
inputKey=$1

if [ $correctKey = $inputKey ]
	then
		cd ../
		git pull origin master:master --quiet --progress
		npm install
		bower update
		# npm run build:
		ulimit -n 10000 
		npm run css 
		npm run transform-js 
		npm run browserify
		
		exit 0
	else
		echo 'Wrong deploy key '
		exit 1
	fi