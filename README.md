![meteor logo](https://cloud.githubusercontent.com/assets/15331966/13201426/fa4f14bc-d83e-11e5-905d-71eb3aa2f714.png)

#SO WHAT IS IT?
> _"Meteor is to Javascript as Rails is to Ruby."_

##Meteor is a Javascript platform.
###Like all platforms, Meteor is specially configured with attributes that make it ideal to use under certain conditions. 
###Meteor’s special attribute is its built-in reactiveness/live update functionality.
###What this means is that meteor is useful for apps requiring real time data updates, as with messaging apps, collaborative editing aps, two player online games, etc.
##Some other features:
* Uses JavaScript for front-end, back-end, and database implementation
* Has own templating system to display data on the page
* Uses javascript-based Node.js to create server and networking tools, and handle server-side functionality
* Uses MongoDB as database software, which plugs data into json-like collections instead of relational databases. The persistent data
    * can be accessed from both the server and the client, making it easy to write view logic without having to write a lot of server code
    * update themselves automatically, so a view component backed by a collection will automatically display the most up-to-date data

##Creating a meteor app
1. In terminal, install meteor

    `curl https://install.meteor.com/ | sh`

2. In terminal, create meteor app

    `meteor create appname`

    * This will create a directory called appname, with starter files to be built out. E.g.,
        * _appname_.js
            * JavaScript file loaded on both client and server
            * Javascript files contain data models/db, functions, data calls and other manipulators, and event handlers

        * _appname_.html
            * html files are comprised of 3 top level tags: 

            `<head>`

            * Includes normal head elements title for the document, scripts, styles, meta information

            `<body>`

            * Contains page contents. Displays data by referencing templates, as well as functions and event handlers defined elsewhere.
                * Templates are referenced using {{> _templatename_}}
                * Functions are referenced using {{_functionname_}}
                * Event handlers are not referenced but obeyed

            `<template>`

            * Contains instructions for handling, parsing data. E.g,
                * How to display a kind of data, like what kind tags to enclose them in.
                * When to display data using {{#if…}}{{/if}} and/or {{#unless…}}{{/unless}} conditionals
                * How to loop through data using {{#ieach…}}{{/each}} loops

        * _appname_.css       
            * A CSS file to define your app's styles

        * .meteor                 
            * Internal Meteor files

        * Folders
            * /client – for code running on client
            * /server – for code running on server, like data authorization, external services
            * /public – for resources used by/on the client, like images, fonts
            * /private – for resources that should be unavailable to the client, like configuration, etc.

3. For added functionality, can add packages provided by meteor. E.g,

    `cd appname`

* Fonts:

    `meteor add udondan:googlefonts`

* SCSS:

    `meteor add fourseven:scss`

* Format dates:

    `meteor add mrt:moment`

* User and user id functionality:

    `meteor add accounts-password`

* Use of a template with a built-in login and registration for:

    `meteor add accounts-ui`

* Twitter login option. Requires that you create an app at apps.twitter.com:

    `meteor add accounts-twitter`

##How chit-chat works

###Run the app

    meteor

![chit-chat](https://cloud.githubusercontent.com/assets/15331966/13205327/e96f7b3a-d8b3-11e5-9838-d211259c47ea.png)

###_model_.js

    Messages = new Mongo.Collection('messages');

###The HTML

    <!-- There is no need for HTML tags. Meteor adds them for you.  -->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
    </head>

    <!-- The body of the app, with placeholders for the templates and coordinating names -->
    <body>  
      <h1>Chit-Chat</h1>
      {{> welcome }}
      {{> input }}
      {{> messages }}
    </body>

    <!-- Templates. They can be saved in html files with the same name as the template tag -->
    <template name="welcome">
      <div class="welcome">
        <p>
          Let's chit-chat.
        </p>
      </div>
    </template>

    <template name="messages">
      <div class="data">
        {{#each messages}}
          <strong>{{name}}:</strong> {{message}} <br>
        {{/each}}
      </div>
    </template>

    <template name="input">
      <div class="input">
        <p>Name: <input type="text" id="name"></p>
        <p>Message: <input type="text" id="message"></p>
        <button  type="submit" id="submit">Submit</button>
        <br>
      </div>
    </template>


###Enter name and message, insert into db

![enter name & message](https://cloud.githubusercontent.com/assets/15331966/13205392/08861546-d8b5-11e5-9aa3-05a606619c8a.png)

_Client.JS_

    // Event handler for input tag and submit button. 
    Template.input.events = {
       // jquery equiv:
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

_Client.HTML_

    <template name="input">
      <div class="input">
        <p>Name: <input type="text" id="name"></p>
        <p>Message: <input type="text" id="message"></p>
        <button  type="submit" id="submit">Submit</button>
        <br>
      </div>
    </template>

###Clear out fields, print message in real time

![clear field & display messages](https://cloud.githubusercontent.com/assets/15331966/13205394/12a0fcee-d8b5-11e5-8646-43b96b51d1dd.png)

_Client.JS_

    // the client and server logic is divided by .isClient and .isServer. It is often organized by 
// dividing the logic into different folders.
// Need to explore the below if statement more to know what it is doing. 
// I think it is sorting the messages from the DB based on the timestamp. This is how they are displayed
// in our view

if (Meteor.isClient) {

    // this is a 'local' helper
    // in a global helper, you would not need to name the template
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
      
        },
        formattedTime: function() {
            return moment(this.time).startOf(this.time).fromNow();

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
      var message = document.getElementById('message');

//If the value of the message is not empty then insert the values into DB
      if (message.value != '') {
        Messages.insert({
          name: name.value,
          message: message.value,
          time: new Date(),
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

    }
    }

     Template.messages.helpers({
            messages: function() {
                return Messages.find({}, { sort: { time: -1}});
                // the -1 sorts it in desc order
                // changing -1 to 1 reverses the order and you dont have to refresh!
                // meteor is real time by default!
          
            },
            formattedTime: function() {
                return moment(this.time).startOf(this.time).fromNow();

            }


        });
       

_Client.HTML_


    <template name="messages">
      <div class="data">
        {{#each messages}}
          <strong>{{name}}:</strong> {{message}} <br>
        {{/each}}
      </div>
    </template>


###The Javascript

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
          
            },
            formattedTime: function() {
                return moment(this.time).startOf(this.time).fromNow();
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
              time: new Date(),
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

###The CSS

    html {
        padding: 10px;
        font-family: Verdana, sans-serif;
    }

    .login-buttons-dropdown-align-right {
        float: right;
    }

    h1 {
      text-align: center;
      margin: 0 auto;
      border-bottom: 2px solid black;

    }

    .welcome {
      text-align: center;
      padding: 10px;
      margin: 10px 30% 20px 30%;
      border: 1px solid black;
      border-radius: 10px;
      background: linear-gradient(#6a3093, #a044ff);
      color: white;
      box-shadow: -8px 10px 32px 1px rgba(8,8,8,1);;

    }

    .data {
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      margin: 10px 30% 20px 30%;
      border: 1px solid black;
      background: linear-gradient(#6a3093, #a044ff);
      color: white;
      box-shadow: -8px 10px 32px 1px rgba(8,8,8,1);
    }

    .input {
      border-radius: 10px;

      margin: 10px 30% 20px 30%;
      border: 1px solid black;
      padding: 10px;
      background: linear-gradient(#6a3093, #a044ff);
      color: white;
      box-shadow: -8px 10px 32px 1px rgba(8,8,8,1);
    }


