'use strict';

var PaneActions = require('../actions/PaneActions'),
	ImageProvider = function(){};


ImageProvider.prototype.start = function(){};

ImageProvider.prototype.getDefaultImage = function(){};


ImageProvider.prototype.startLoading = function()
{ 
	PaneActions.startLoading();
};

ImageProvider.prototype.stopLoading = function()
{ 
	PaneActions.stopLoading();
};

ImageProvider.prototype.setImage = function(image)
{
	//PaneActions.gameRollback();
 	PaneActions.setImage(image);
};


module.exports = ImageProvider;