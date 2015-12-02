window.KeyActions = {

  keyPressed: function (note) {
    AppDispatcher.dispatch({
      eventType: KeyConstants.KEY_PRESSED,
      note: note
    });
  },

  keyReleased: function (note) {
    AppDispatcher.dispatch({
      eventType: KeyConstants.KEY_RELEASED,
      note: note
    });
  },

  groupUpdate: function (notes) {
    AppDispatcher.dispatch({
      actionType: OrganConstants.GROUP_UPDATE,
      notes: notes
    });
  }
};
