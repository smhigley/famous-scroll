define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var ScrollView = require('famous/views/Scrollview');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ScrollSync = require("famous/inputs/ScrollSync");

    var GridListView = require('views/GridListView');

    function AppView() {
      View.apply(this, arguments);

      this.screenMod = new StateModifier({
        origin: [0.5, 0],
        align: [0.5, 0.09],
        size: this.options.size
      });

      this.rootNode = this.add(this.screenMod);

      this.scrollSync = new ScrollSync();

      _createScrollContainer.call(this);
      _createScrollSurface.call(this);

      // scroll bindings
      this.scrollTimeout; // very simple debouncing

      this.scrollSync.on('start', function() {
        console.log('scrolling started');
        clearTimeout(this.scrollTimeout);

        _startScrolling.call(this);
      }.bind(this));

      /*this.scrollSync.on('update', function(data) {
        var scrollOffset = this.scrollInstance.getPosition();

        // set cell background scroll amount
        var ratio = (scrollOffset/900) * 150;
        for (var i = 0, temp; i < this.options.numGrids; i++) {
          this.grids[i].scrollCells(ratio);
        }
      }.bind(this));*/

      this.scrollSync.on('end', function() {
        var self = this;
        console.log('scrolling ended');
        this.scrollTimeout = setTimeout(function(){ _endScrolling.call(self); }, 100);
        
      }.bind(this));

    }

    function _createScrollContainer() {
      this.screen = new ContainerSurface({
        classes: ['screen'],
        properties: {
          overflow: 'hidden'
        }
      });
      this.rootNode.add(this.screen);
    }

    function _createScrollSurface() {
      this.scrollInstance = new ScrollView({
        margin: 10000,
        groupScroll: true
      });

      this.scrollSizeMod = new StateModifier({
        origin: [0.15, 0],
        align: [0.5, 0]
      });

      this.grids = [];
      this.scrollInstance.sequenceFrom(this.grids);

      // build 3x3 grids
      var gridSize = [this.options.gridSize * 3, this.options.gridSize * 3];
      for (var i = 0, temp; i < this.options.numGrids; i++) {
        temp = new GridListView({
          size: gridSize,
          data: this.options.data
        });

        //this.scrollInstance.subscribe(temp);
        temp.pipe(this.scrollInstance);
        this.scrollSync.subscribe(temp);

        /*this.scrollInstance.sync.on('update', function(data) {
          console.log(data)
        });*/

        this.grids.push(temp);
      }

      this.screen.add(this.scrollSizeMod).add(this.scrollInstance);
    }

    function _startScrolling() {
      var scaleAmount = this.options.zoomRatio;

      // resize scrollview
      this.scrollSizeMod.setTransform(Transform.scale(scaleAmount, scaleAmount, 1), {
        duration: 500
      });

      // zoom grid cell backgrounds
      for (var i = 0, temp; i < this.options.numGrids; i++) {
        this.grids[i].zoomCells(scaleAmount, 500);
      }
    }

    function _endScrolling() {
      console.log('animate scroll end');
      var scaleAmount = 1;
      this.scrollSizeMod.setTransform(Transform.scale(scaleAmount, scaleAmount, 1), {
        duration: 500
      });
      for (var i = 0, temp; i < this.options.numGrids; i++) {
        this.grids[i].zoomCells(scaleAmount, 500);
      }
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
      size: [380, 680],
      data: undefined,
      gridSize: 300,
      zoomRatio: 0.5,
      numGrids: 5
    };

    module.exports = AppView;
});
