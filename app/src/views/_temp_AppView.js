define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var ScrollView = require('famous/views/Scrollview');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ScrollSync = require('famous/inputs/ScrollSync');
    var ExtScrollView = require('views/ExtScrollView');

    function AppView() {
      View.apply(this, arguments);

      this.screenMod = new StateModifier({
        origin: [0.5, 0],
        align: [0.5, 0.1],
        size: this.options.size
      });

      this.rootNode = this.add(this.screenMod);

      this.scroller = new ExtScrollView({
        data: this.options.data
      });

      this.rootNode.add(this.scroller);

    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
      size: [400, 600],
      data: undefined,
      gridSize: 300,
      zoomRatio: 0.5,
      numGrids: 5
    };

    module.exports = AppView;
});
