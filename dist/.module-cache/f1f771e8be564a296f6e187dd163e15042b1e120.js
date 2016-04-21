'use strict';

var PaneActions = require('../actions/PaneActions'),
	ImageProvider = function(){};


ImageProvider.prototype.touch = function(){};

ImageProvider.prototype.getDefaultImage = function(){};


ImageProvider.prototype.startLoading = function()
{ 
	PaneActions.startLoading();
};

ImageProvider.prototype.stopLoading = function()
{ 
	PaneActions.stopLoading();
};

ImageProvider.prototype.chargeImage = function(image)
{
	PaneActions.gameRollback();
 	PaneActions.chargeImage(image);
};


module.exports = ImageProvider;