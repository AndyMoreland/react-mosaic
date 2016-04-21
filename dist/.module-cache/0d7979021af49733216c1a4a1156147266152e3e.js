'use strict';

var inherit = require('../../lib/js/inherit'),
	ImageProvider = require('./ImageProvider'),
	_500pxConstants = require('../constants/_500pxConstants'),
	PaneActions = require('../actions/PaneActions'),

	photos = [],
	currentCategory = _500pxConstants.INIT_CATEGORY,
	pageSize = 5,
	imageSize = 4,
	page = 1,
	index = 0,
	isLoaded = false;


function _500pxImageProvider () {
	_500px.init({
		sdk_key: _500pxConstants.JAVASCRIPT_SDK_KEY
	});	

	loadPhotos(1,currentCategory,function(photos){
		index++;
		chargeImage(photos[0]);
	});
};

inherit(_500pxImageProvider,ImageProvider);

function loadPhotos(page, category, callback){
	var only = category || _500pxConstants.INIT_CATEGORY;

	_500px.api('/photos', { 
		feature: 'Popular',
		only: only,
		rpp: pageSize,
		image_size: imageSize,
		page: page 
	}, function (response) {
		//_500pxImageProvider.uber.stopLoading();
		isLoaded = true;
		photos = response.data.photos;
    	if (typeof callback === 'function') callback.call(null,photos);
	});
}

function chargeImage(photo){
	var image = {};
	image.src = photo.image_url;
	image.width = photo.width;
	image.height = photo.height;		
	_500pxImageProvider.uber.chargeImage(image);
}

_500pxImageProvider.prototype.getDefaultImage = function(){
	return {};
};

_500pxImageProvider.prototype.selectCategory = function(category){
	PaneActions.startLoading();
	currentCategory = category;
	loadPhotos(1,currentCategory,function(photos){
		index++;
		chargeImage(photos[0]);
		PaneActions.stopLoading();
	});
};

_500pxImageProvider.prototype.next = function(){
	var image = {};

	if (index >= pageSize) 
	{
		index = 0;
		page++;
		PaneActions.startLoading();
		loadPhotos(page,currentCategory,function(photos){
			chargeImage(photos[0]);
			index++;
			PaneActions.stopLoading();
		});
	} else 
	{
		chargeImage(photos[index])	
		index++;
	}	
}

module.exports = new _500pxImageProvider;


