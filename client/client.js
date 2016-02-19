/**
* Templates
*/
if (Meteor.isClient) {
    Template.messages.helpers({
        messages: function() {
            return Messages.find({}, { sort: { time: -1}});
        }
    });

Template.input.events = {
	
   'click #submit' : function (event) {
    // 13 is the enter key event
      var name = document.getElementById('name');
      // var name = 'Anonymous';
      var message = document.getElementById('message');

      if (message.value != '') {
        Messages.insert({
          name: name.value,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
        document.getElementById('name').value = '';
        name.value = '';
      }
    
  }
}
}

