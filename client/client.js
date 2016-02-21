/**
* Templates
*/

// the client and server logic is divided by .isClient and .isServer. It is often organized by 
// dividing the logic into different folders.
// Need to explore the below if statement more to know what it is doing. 
// I think it is sorting the messages from the DB based on the timestamp. This is how they are displayed
// in our view

if (Meteor.isClient) {

    // this is a 'local' helper
    // in a global helper, you would not need to name the template, i guess
    // rails equiv of below:
    // @messages.order(time: :desc).each do |m|
    // <p><%=m.name%></p> <p><%=m.message%></p>
    // end

    Template.messages.helpers({
        messages: function() {
            return Messages.find({}, { sort: { time: -1}});
            // the -1 sorts it in desc order
            // changing -1 to 1 reverses the order and you dont have to refresh!
            // meteor is real time by default!
      
        }


    });





// the function below is for the input tag and submit button. 
Template.input.events = {
	 

   // jquery equiv of below event handler
   // $('#submit').on('click', function(){
   // var name = $('#name').val();
   // var message = $('#message').val();
   // })
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

