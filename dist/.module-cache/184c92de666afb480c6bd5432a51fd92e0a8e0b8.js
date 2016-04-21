'use strict';

var inherit = require('../../lib/js/inherit'),
	ImageProvider = require('ImageProvider');


function LocalImageProvider () {
	this.image = images[0];
};

inherit(LocalImageProvider,ImageProvider);



module.exports = new LocalImageProvider;