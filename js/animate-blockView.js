define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var AnimateBlockView = Backbone.View.extend({

        className: "animate",

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenToOnce(Adapt, "remove", this.removeInViewListeners);
            this.preRender();
            this.render();
        },

        events: {},

        preRender: function() {
        },

        render: function () {
            this.modelID = '.'+this.model.get('_id');
            this.titleEnabled = false;
            this.bodyEnabled = false;
            this.instructionEnabled = false;
            this.customEnabled = false;
            $(this.modelID).addClass("animate");

            // Title
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._block._title._isEnabled) {
              this.titleEnabled = true;
            }
            // Check var against block view config
            if(this.titleEnabled) {
              this.titleEffect = Adapt.course.get("_animate")._block._title._effect;
              $(this.modelID).find(".block-title-inner").addClass("animated");
              $(this.modelID).find(".block-title-inner").addClass("element-hidden");
            } else if(this.model.has("_animate")._title) {
              if(this.model.get("_animate")._title._isEnabled) {
                this.titleEnabled = true;
                this.titleEffect = this.model.get("_animate")._title._effect;
                $(this.modelID).find(".block-title-inner").addClass("animated");
                $(this.modelID).find(".block-title-inner").addClass("element-hidden");
              }
            }

            // Body
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._block._body._isEnabled) {
              this.bodyEnabled = true;
            }
            // Check var against block view config
            if(this.bodyEnabled) {
              this.bodyEffect = Adapt.course.get("_animate")._block._body._effect;
              $(this.modelID).find(".block-body-inner").addClass("animated");
              $(this.modelID).find(".block-body-inner").addClass("element-hidden");
            } else if (this.model.has("_animate")._body) {
              if (this.model.get("_animate")._body._isEnabled) {
                this.bodyEnabled = true;
                this.bodyEffect = this.model.get("_animate")._body._effect;
                $(this.modelID).find(".block-body-inner").addClass("animated");
                $(this.modelID).find(".block-body-inner").addClass("element-hidden");
              }
            }

            // Instruction
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._block._instruction._isEnabled) {
              this.instructionEnabled = true;
            }
            // Check var against block view config
            if(this.instructionEnabled) {
              this.instructionEffect = Adapt.course.get("_animate")._block._instruction._effect;
              $(this.modelID).find(".block-instruction-inner").addClass("animated");
              $(this.modelID).find(".block-instruction-inner").addClass("element-hidden");
            } else if (this.model.has("_animate")._instruction) {
              if (this.model.get("_animate")._instruction._isEnabled) {
                this.instructionEnabled = true;
                this.instructionEffect = this.model.get("_animate")._instruction._effect;
                $(this.modelID).find(".block-instruction-inner").addClass("animated");
                $(this.modelID).find(".block-instruction-inner").addClass("element-hidden");
              }
            }

            // Custom
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._block._custom._isEnabled) {
              this.customEnabled = true;
            }
            // Check var against block view config
            if(this.customEnabled) {
              this.customElement = Adapt.course.get("_animate")._block._custom._element;
              this.customEffect = Adapt.course.get("_animate")._block._custom._effect;
              $(this.modelID).find('.'+this.customElement).addClass("animated");
              $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
            } else if (this.model.has("_animate")._custom) {
              if(this.model.get("_animate")._custom._isEnabled) {
                this.customEnabled = true;
                this.customElement = this.model.get("_animate")._custom._element;
                this.customEffect = this.model.get("_animate")._custom._effect;
                $(this.modelID).find('.'+this.customElement).addClass("animated");
                $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
              }
            }

            _.defer(_.bind(function() {
                this.postRender();
            }, this));
        },

        postRender: function() {
          $(this.modelID).on('inview', _.bind(this.inview, this));
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }
                // Check if element come into view on screen
                if (this._isVisibleTop) {
                  this.animateElements();
                }
            }
        },

        animateElements: function () {
          if(this.titleEnabled) {
            $(this.modelID).find(".block-title-inner").addClass(this.titleEffect);
            $(this.modelID).find(".block-title-inner").removeClass("element-hidden");
          }
          if(this.bodyEnabled) {
            $(this.modelID).find(".block-body-inner").addClass(this.bodyEffect);
            $(this.modelID).find(".block-body-inner").removeClass("element-hidden");
          }
          if(this.instructionEnabled) {
            $(this.modelID).find(".block-instruction-inner").addClass(this.instructionEffect);
            $(this.modelID).find(".block-instruction-inner").removeClass("element-hidden");
          }
          if(this.customEnabled) {
            $(this.modelID).find('.'+this.customElement).addClass(this.customEffect);
            $(this.modelID).find('.'+this.customElement).removeClass("element-hidden");
          }
        },

        removeInViewListeners: function () {
          $(this.modelID).off('inview');
        }

    });

    return AnimateBlockView;

});
