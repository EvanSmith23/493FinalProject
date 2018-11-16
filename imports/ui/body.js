import { Template } from 'meteor/templating';
import { Books } from '../api/collections.js';
import { Users } from '../api/collections.js';
import './body.html';
import './book.html';

Template.body.onCreated(function() {
  this.loginPage = new ReactiveVar( true );
  this.buyPage = new ReactiveVar( false );
  this.sellPage = new ReactiveVar( false );  
  this.user = new ReactiveVar("");
});
Template.body.helpers({
  loginPage: function() {
    return Template.instance().loginPage.get();
  },
  buyPage: function() {
    return Template.instance().buyPage.get();
  },
  sellPage: function() {
    return Template.instance().sellPage.get();
  },
  books: function() {
    return Books.find({}).fetch();
  },
  mybooks: function(){
    return Books.find({ username: Template.instance().user.get() }).fetch();
  }
});
Template.body.events({
  'submit .login'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = Users.find({ "username" : username, "password" : password }).fetch();

    if( users.length > 0 )
    {
      template.loginPage.set(false);

      template.user.set(username);

      console.log("Username: " + username);
    } 
    else 
    {
      document.getElementById('loginErrorMessage').innerHTML = "Error: Username does not exist";
    }

    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
  },
  'submit .createAccount'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get values from form
    const username = document.getElementById('createUsername').value;
    const password = document.getElementById('createPassword').value;
    const confirmPassword = document.getElementById('createConfirmPassword').value;
    const email = document.getElementById('createEmail').value;

    // check if the user already exists
    if(!Users.findOne({ "username" : username })){
      Users.insert({ username : username, password : password, email : email, createdAt: new Date()});
      
      template.loginPage.set(false);
      
      template.user.set(username);

      console.log("Username: " + username);
    } else {
      document.getElementById('createAccountErrorMessage').innerHTML = "Error: Username already exists";
    }

    document.getElementById('createUsername').value = '';
    document.getElementById('createPassword').value = '';
    document.getElementById('createConfirmPassword').value = '';
    document.getElementById('createEmail').value = '';
  },
  'submit .newBook' (event, template){
    event.preventDefault();

    // Retrieve values from the text fields
    const bookTitle = document.getElementById('bookTitle').value;
    const bookIsbn = document.getElementById('bookIsbn').value;
    const bookClass = document.getElementById('bookClass').value;
    const bookPrice = document.getElementById('bookPrice').value;

    // Insert into Books Collection
    Books.insert({ title: bookTitle, isbn: bookIsbn, className: bookClass, price: bookPrice, username: Template.instance().user.get(),createdAt: new Date() });

    // Reset values from the text fields
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookIsbn').value = '';
    document.getElementById('bookClass').value = '';
    document.getElementById('bookPrice').value = '';
  },
  'submit .newBook' (event, template){
    event.preventDefault();

    // Retrieve values from the radio fields
    if(document.getElementById('titleChoice').val()){

    } else if(document.getElementById('isbnChoice').val()){

    } else if(document.getElementById('classChoice').val()){

    }

  },
  'click .buyButton' (event, template){
      template.buyPage.set(true);
      template.sellPage.set(false);
  },
  'click .sellButton' (event, template){
      template.buyPage.set(false);
      template.sellPage.set(true);
  },
  'click .profileButton' (event, template){
      template.buyPage.set(false);
      template.sellPage.set(false);
  },
});