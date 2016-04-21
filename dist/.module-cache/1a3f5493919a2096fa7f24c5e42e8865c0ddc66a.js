'use strict';

var inherit = require('../../lib/js/inherit'),
	ImageProvider = require('./ImageProvider'),
	_500pxConstants = require('../constants/_500pxConstants'),

	photos = [],
	currentCategory = _500pxConstants.INIT_CATEGORY,
	pageSize = 20,
	imageSize = 4,
	page = 1,
	index = 0,
	isLoaded = false;


function _500pxImageProvider () {
	_500px.init({
		sdk_key: _500pxConstants.JAVASCRIPT_SDK_KEY
	});	

	loadPhotos(1,currentCategory,function(photos){
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
	currentCategory = category;
	loadPhotos(1,currentCategory,function(photos){
		chargeImage(photos[0]);
	});
};

_500pxImageProvider.prototype.next = function(){
	var image = {};

	if (index >= pageSize) 
	{
		index = 0;
		page++;
		loadPhotos(page,currentCategory,function(photos){
			chargeImage(photos[0]);
			index++;
		});
	} else 
	{
		chargeImage(photos[index])	
		index++;
	}	
}

module.exports = new _500pxImageProvider;


