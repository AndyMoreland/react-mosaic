# !/bin/sh
#
# Deploy script
#

correctKey=$(<deployKey.txt)
inputKey=$1

if [ correctKey = inputKey]
	then
		#git pull origin master:master --quiet --progress
		git pull origin master:master --verbose
		npm install
		bower update --allow-root
		npm run build
		exit 0
	else
		echo 'error'
		exit 1
	fi