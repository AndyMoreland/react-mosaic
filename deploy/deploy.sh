# !/bin/sh
#
# Deploy script
#

correctKey=$(cat deployKey.txt)
inputKey=$1

if [ $correctKey = $inputKey ]
	then
		cd ../ &&

		echo 'git pull'
		echo git pull origin master:master --quiet
		
		echo 'installing node packages'
		npm install
		
		echo 'updating bower packages'
		bower update --force-latest
		
		echo 'build production project'
		npm run production-build
		
		echo 'Successful deploy'
		exit 0
	else
		echo 'Wrong deploy key'
		exit 1
	fi