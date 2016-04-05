define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Transitionable = require('famous/transitions/Transitionable');

  function GridCellView() {
    View.apply(this, arguments);

    this._eventInput.pipe(this._eventOutput);

    this.bgScroll = new Transitionable(0);

    _createGridCell.call(this);
    _addParallaxImage.call(this);
    _addContent.call(this);
  }

  GridCellView.prototype = Object.create(View.prototype);
  GridCellView.prototype.constructor = GridCellView;

  GridCellView.DEFAULT_OPTIONS = {
    bgURL: undefined,
    text: 'test'
  };

  function _createGridCell() {
    this.cell = new ContainerSurface({
      size: [undefined, undefined],
      properties: {
        overflow: 'hidden'
      }
    });

    this.add(this.cell);
  }

  function _addParallaxImage() {
    this.parallaxImage = new ImageSurface({
      size: [300, 300],
      content: this.options.bgURL
    });

    this.parallaxImage.pipe(this._eventInput);

    this.positionMod = new Modifier({
      origin: [0.5, 0.5],
      align: [0.5, 0.5],
      transform: function() {
        var currentScroll = this.bgScroll.get();
        return Transform.translate(0, currentScroll, 0);
      }.bind(this)
    });

    this.bgSizeMod = new Modifier({
      transform: Transform.scale(1, 1, 1)
    });

    this.cell.add(this.positionMod).add(this.bgSizeMod).add(this.parallaxImage);
  }

  function _addContent() {
    this.textContent = new Surface({
      content: this.options.text,
      size: [undefined, 75],
      classes: ['cell-content']
    });

    this.textMod = new Modifier({
      origin: [0.5, 1],
      align: [0.5, 1],
      opacity: 1
    });

    this.textContent.pipe(this._eventInput);

    this.cell.add(this.textMod).add(this.textContent);
  }

  GridCellView.prototype.animateZoom = function(amount, duration) {
    this.bgSizeMod.setTransform(Transform.scale(amount, amount, 1), {
      duration: duration
    });

    if (amount <= 1) {
      this.textMod.setOpacity(1, {duration: duration});
    } else {
      this.textMod.setOpacity(0, {duration: duration});
    }
    this.bgScroll.set(0, {duration: duration});
  };

  GridCellView.prototype.parallaxScroll = function(amount) {
    //var currentScroll = this.bgScroll.get();
    //var delta = data.delta[1]*0.5;
    this.bgScroll.set(amount);
  };

  module.exports = GridCellView;
});
