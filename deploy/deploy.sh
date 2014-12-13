# 
#
# Deploy script
#

# correctKey=$(cat deployKey.txt)
# inputKey=$1

# if [ $correctKey = $inputKey ]
# 	then
		cd ../

		echo 'git pull'
		git pull
		
		echo 'installing node packages'
		npm install
		
		echo 'updating bower packages'
		bower update --force-latest
		
		echo 'build production project'
		npm run production-build
		
		echo 'Successful deploy'
		exit 0
	# else
	# 	echo 'Wrong deploy key'
	# 	exit 1
	# fi