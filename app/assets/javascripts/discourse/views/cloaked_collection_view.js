/**
  Display a list of cloaked items

  @class CloakedContainerView
  @extends Discourse.View
  @namespace Discourse
  @module Discourse
**/

$.fn.onScreen = function(){
    var $t                   = $(this).eq(0),
        t                    = $t.get(0),
        $w                   = $(window),
        viewTop              = $w.scrollTop(),
        viewBottom           = viewTop + $w.height(),
        _top                 = $t.offset().top,
        _bottom              = _top + $t.height(),
        compareTop           = _bottom,
        compareBottom        = _top;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};

Discourse.CloakedCollectionView = Ember.CollectionView.extend(Discourse.Scrolling, {
  topVisible: null,
  bottomVisible: null,

  init: function() {
    var cloakView = this.get('cloakView'),
        idProperty = this.get('idProperty') || 'id';

    this.set('itemViewClass', Discourse.CloakedView.extend({
      classNames: [cloakView + '-cloak'],
      cloaks: Em.String.classify(cloakView) + 'View',
      defaultHeight: this.get('defaultHeight') || 100,

      init: function() {
        this._super();
        this.set('elementId', cloakView + '-cloak-' + this.get('content.' + idProperty));
      },
    }));

    this._super();
    Ember.run.next(this, 'scrolled');
  },

  _topVisibleChanged: function() {
    var controller = this.get('controller');
    if (controller.topVisibleChanged) { controller.topVisibleChanged(this.get('topVisible')); }
  }.observes('topVisible'),

  _bottomVisible: function() {
    var controller = this.get('controller');
    if (controller.bottomVisibleChanged) { controller.bottomVisibleChanged(this.get('bottomVisible')); }
  }.observes('bottomVisible'),

  scrolled: function() {
    var childViews = this.get('childViews'),
        toUncloak = [],
        toCloak = [];

    for (var i=0; i<childViews.length; i++) {
      var view = childViews[i];
      if (view.$().onScreen()) {
        toUncloak.push(view);
      } else {
        toCloak.push(view);
      }
    }

    if (toUncloak.length) {
      this.setProperties({topVisible: toUncloak[0].get('content'), bottomVisible: toUncloak[toUncloak.length-1].get('content')})
    } else {
      this.setProperties({topVisible: null, bottomVisible: null});
    }

    Em.run.schedule('afterRender', function() {
      toUncloak.forEach(function (v) { v.uncloak(); });
      toCloak.forEach(function (v) { v.cloak(); });
    });

  },

  didInsertElement: function() {
    this.bindScrolling();
  },

  willDestroyElement: function() {
    this.unbindScrolling();
  }

});


Discourse.View.registerHelper('cloaked-collection', Discourse.CloakedCollectionView);