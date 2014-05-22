/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Utility = require('famous/utilities/Utility');

    var PhotoData = require('data/PhotoData');
    var AppView = require('views/AppView');

    // create the main context
    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);

    Utility.loadURL(PhotoData.getUrl(), initApp);

    function initApp(data) {
      data = PhotoData.parse(data);

      var appView = new AppView({ data : data });

      mainContext.add(appView);
    }
});
