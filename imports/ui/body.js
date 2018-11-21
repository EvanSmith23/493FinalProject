import { Template } from 'meteor/templating';
import { Email } from 'meteor/email';
import { Books } from '../api/collections.js';
import { Users } from '../api/collections.js';
import './body.html';
import './book.html';
import './account.html'

Template.body.onCreated(function() {
  this.loginPage = new ReactiveVar( true );
  this.buyPage = new ReactiveVar( false );
  this.sellPage = new ReactiveVar( false );  
  this.user = new ReactiveVar("");
  this.buyPageSearch = new ReactiveVar("");
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
  },
  myAccount: function(){
    return Users.find({ username: Template.instance().user.get() }).fetch();
  },
  buyPageBooks: function(){
    if(Template.instance().buyPageSearch.get() == ""){
      return Books.find({}).fetch();
    } else {
      return Books.find({ 
          "$or" : [{ "title" : Template.instance().buyPageSearch.get() },
                  { "isbn" : Template.instance().buyPageSearch.get() },
                  { "classChoice" : Template.instance().buyPageSearch.get() }
                  ]
          });
    }
  },
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
  'submit .updateInfo'(event, template) {
    event.preventDefault();

    const accountOwner = Template.instance().user.get();

    var userResults = Users.find({ "username" : accountOwner }).fetch();
    var userId = userResults[0]._id;

    var newUsername = document.getElementById('usernameUpdate').value;
    var newEmail = document.getElementById('emailUpdate').value;
    var newPassword = document.getElementById('newPassword1').value;
    var confirmPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword != confirmPassword) {
      alert("New password much match confirm password");
      return
    }

    if (newUsername == "") {
      newUsername = userResults[0].username;
    }

    if (newEmail == "") {
      newEmail = userResults[0].email;
    }

    if (newPassword == "") {
      Users.update({_id : userId},{$set:{username: newUsername, email: newEmail}});
      template.user.set(newUsername);
      alert("Your username is now: " + newUsername + " and your e-mail is now: " + newEmail + ".");
    }
    else {
      Users.update({_id : userId},{$set:{username: newUsername, email: newEmail, password: newPassword}});
      template.user.set(newUsername);
      alert("Password successfully updated.");
      alert("Your username is now: " + newUsername + " and your e-mail is now: " + newEmail + ".");
    }

    var bookList = Books.find({ "username" : accountOwner }).fetch();
    var count;
    var bookListLen = bookList.length;
    for(count = 0; count < bookListLen; count++) {
      var bookId = bookList[count]._id;
      Books.update({_id : bookId},{$set:{username: newUsername}});
    }
    bookList = Books.find({ "username" : newUsername }).fetch();

    // TODO REMOVE DELETE BUTTON ON BUY PAGE

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
    const bookCondition = document.getElementById('bookCondition').value;
    var bookDescription = document.getElementById('bookDescription').value;

    if (bookDescription == "") {
      bookDescription = "No description provided.";
    }

    // Insert into Books Collection
    Books.insert({ title: bookTitle, isbn: bookIsbn, className: bookClass, price: bookPrice, condition: bookCondition, description: bookDescription, username: Template.instance().user.get(),createdAt: new Date() });

    // Reset values from the text fields
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookIsbn').value = '';
    document.getElementById('bookClass').value = '';
    document.getElementById('bookPrice').value = '';
    document.getElementById('bookCondition').value = '';
    document.getElementById('bookDescription').value = '';
  },
  'submit .findBook' (event, template){
    event.preventDefault();

    template.buyPageSearch.set(document.getElementById('buyPageSearchText').value);
    document.getElementById('buyPageSearchText').value = "";
  },
  'click .contactSeller' (event, template){
    const sellingUser = event.target.childNodes[1].data;

    var sellerResults = Users.find({ "username" : sellingUser }).fetch();
    var sellerEmail = sellerResults[0].email;

    var buyerResults = Users.find({ "username" : Template.instance().user.get() }).fetch();
    var buyerEmail = buyerResults[0].email

    var subject = 'Contacting to Purchase Book';
    var body = 'Looking to buy a book!';

    Meteor.call('sendEmail', sellerEmail, buyerEmail, subject, body, function(error, result){
      if (error) {
        console.log(error);
      }
      else {
        console.log(result);
      }
    });
  },
  'click .deleteBookBtn' (event, template){
    var bookID = this._id;
    var bookOwner = this.username;
    if (bookOwner != Template.instance().user.get()) {
      alert("Cannot delete a book that you don't own!");
      return;
    }
    else {
      Books.remove(this._id);
      alert("Book successfully deleted.")
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
  'click .logoutButton' (event, template) {
      template.loginPage.set(true);
      template.buyPage.set(false);
      template.sellPage.set(false);
      template.user.set("");
  },
});