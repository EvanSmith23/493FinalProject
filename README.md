Steps for Setting Up the Project

1. Download MeteorJS
-- curl https://install.meteor.com/ | sh
2. Install and Save React and ReactDOM packages
-- meteor npm install --save react react-dom
3. Set up Bootstrap
-- meteor add twbs:bootstrap
-- meteor npm install --save bootstrap
** not sure which one actually worked lol **
4. Should be all set!

Possible Issues:
-- Two packages Meteor/templating and static-html want to render ".html" files
-- Solution: meteor remove templating
-----> removes templating package from repo

To Do:
-- Hide Password characters in login and create account fields
-- add user rating
-- filter searches based on radio button checked
-- create application name
-- add profile picture
-- add math to determine user rating

Questions:
1. Are we going to use profile pictures and pictures to show for each book?
2. How are we going to store the images?