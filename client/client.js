/**
* Templates
*/

// the client and server logic is divided by .isClient and .isServer. It is often organized by 
// dividing the logic into different folders.
// Need to explore the below if statement more to know what it is doing. 
// I think it is sorting the messages from the DB based on the timestamp. This is how they are displayed
// in our view

if (Meteor.isClient) {
    Template.messages.helpers({
        messages: function() {
            return Messages.find({}, { sort: { time: -1}});
        }
    });
// the function below is for the input tag and submit button. 
Template.input.events = {
	
   'click #submit' : function (event) {
      var name = document.getElementById('name');
      // var name = 'Anonymous';
      var message = document.getElementById('message');

//If the value of the message is not empty then insert the values into DB
      if (message.value != '') {
        Messages.insert({
          name: name.value,
          message: message.value,
          time: Date.now(),
        });

//resets the values in the input fields
        document.getElementById('message').value = '';
        message.value = '';
        document.getElementById('name').value = '';
        name.value = '';
      }
    
  }
}
}

