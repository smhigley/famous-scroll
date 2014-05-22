define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transitionable = require("famous/transitions/Transitionable");
    var GridLayout = require('famous/views/GridLayout');

    var GridCellView = require('views/GridCellView');

    function GridListView() {
      View.apply(this, arguments);

      this._eventInput.pipe(this._eventOutput);

      this.rootModifier = new StateModifier({
        size: this.options.size,
        origin: [0.5, 0],
        align: [0.5, 0],
        classNames: 'main-grid'
      });

      this.rootNode = this.add(this.rootModifier);

      _createPhotoGrid.call(this);

    }

    GridListView.prototype = Object.create(View.prototype);
    GridListView.prototype.constructor = GridListView;

    GridListView.DEFAULT_OPTIONS = {
      size: [600, 600],
      data: undefined,
      cells: 9
    };

    function _createPhotoGrid() {
      this.grid = new GridLayout({
        dimensions: [3, 3]
      });
      this.cells = [];
      this.grid.sequenceFrom(this.cells);

      for(var i = 0; i < this.options.cells; i++) {

        this.cells.push(new GridCellView({
          bgURL: this.options.data[i],
          text: 'Grid cell #' + i
        }));
        this.cells[i].pipe(this._eventInput);

      }

      this.rootNode.add(this.grid);
    }

    GridListView.prototype.zoomCells = function(amount, duration) {
      //animate cell backgrounds
      for(var i = 0; i < this.options.cells; i++) {
        this.cells[i].animateZoom(1/amount, duration);
      }
    }

    GridListView.prototype.scrollCells = function(amount) {
      for(var i = 0; i < this.options.cells; i++) {
        this.cells[i].parallaxScroll(amount);
      }
    }

    module.exports = GridListView;
});
