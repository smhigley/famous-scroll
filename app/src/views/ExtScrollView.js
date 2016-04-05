define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var ScrollView = require('famous/views/Scrollview');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var GridListView = require('views/GridListView');

    function ExtScrollView() {
      ScrollView.apply(this, arguments);

      _createScrollContainer.call(this);
      _createScrollSurface.call(this);
      console.log(this);

    }

    ExtScrollView.prototype = Object.create(ScrollView.prototype);
    ExtScrollView.prototype.constructor = ExtScrollView;

    ExtScrollView.DEFAULT_OPTIONS = {
      data: undefined,
      gridSize: 300,
      zoomRatio: 0.5,
      numGrids: 5
    };

    function _createScrollContainer() {
      this.screen = new ContainerSurface({
        classes: ['screen'],
        properties: {
          overflow: 'hidden'
        }
      });
      this.add(this.screen);
    }

    function _createScrollSurface() {
      this.scrollInstance = new ScrollView({
        margin: 10000,
        groupScroll: true
      });

      this.scrollSizeMod = new StateModifier({
        //origin: [0.5, 0],
        //align: [0.5, 0]
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
        //temp.pipe(this.scrollInstance);
        //this.scrollSync.subscribe(temp);

        this.grids.push(temp);
        console.log(i);
      }

      console.log(this.grids);

      this.screen.add(this.scrollSizeMod).add(this.scrollInstance);
    }

    // overwrite default scrollview scroll events

    function _handleStart(event) {
        this._touchCount = event.count;
        if (event.count === undefined) this._touchCount = 1;

        _detachAgents.call(this);
        this.setVelocity(0);
        this._touchVelocity = 0;
        this._earlyEnd = false;
    }

    function _handleMove(event) {
        var velocity = -event.velocity;
        var delta = -event.delta;

        if (this._onEdge && event.slip) {
            if ((velocity < 0 && this._onEdge < 0) || (velocity > 0 && this._onEdge > 0)) {
                if (!this._earlyEnd) {
                    _handleEnd.call(this, event);
                    this._earlyEnd = true;
                }
            }
            else if (this._earlyEnd && (Math.abs(velocity) > Math.abs(this.getVelocity()))) {
                _handleStart.call(this, event);
            }
        }
        if (this._earlyEnd) return;
        this._touchVelocity = velocity;

        if (event.slip) this.setVelocity(velocity);
        else this.setPosition(this.getPosition() + delta);
    }

    function _handleEnd(event) {
        this._touchCount = event.count || 0;
        if (!this._touchCount) {
            _detachAgents.call(this);
            if (this._onEdge) _setSpring.call(this, this._edgeSpringPosition, SpringStates.EDGE);
            _attachAgents.call(this);
            var velocity = -event.velocity;
            var speedLimit = this.options.speedLimit;
            if (event.slip) speedLimit *= this.options.edgeGrip;
            if (velocity < -speedLimit) velocity = -speedLimit;
            else if (velocity > speedLimit) velocity = speedLimit;
            this.setVelocity(velocity);
            this._touchVelocity = undefined;
            this._needsPaginationCheck = true;
        }
    }

    module.exports = ExtScrollView;
});
