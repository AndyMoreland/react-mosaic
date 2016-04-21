'use strict';

var PaneActions = require('../actions/PaneActions'),
	ImageProvider = function(){};

ImageProvider.prototype.start = function(){};
ImageProvider.prototype.getDefaultImage = function(){ return {} };

function ImageProvider() 
{
	this.start = function(){};

	this.getDefaultImage = function(){
		return {};
	};


	this.startLoading = function()
	{
		PaneActions.startLoading();
	};

	this.stopLoading = function()
	{
		PaneActions.stopLoading();
	};

	this.setImage = function(image)
	{
		PaneActions.setImage(image);	
	};
};


module.exports = ImageProvider;