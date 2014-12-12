# !/bin/sh
#
# Deploy script
#

correctKey=$(cat deployKey.txt)
inputKey=$1

if [ $correctKey = $inputKey ]
	then
		cd ../ &&
		git pull origin master:master --quiet
		npm install
		bower update --force-latest
		npm run production-build
		echo 'Successful deploy'
		exit 0
	else
		echo 'Wrong deploy key'
		exit 1
	fi