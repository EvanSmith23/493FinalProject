Steps for Setting Up the Project

1. Download MeteorJS
-- curl https://install.meteor.com/ | sh
2. Install and Save React and ReactDOM packages
-- meteor npm install --save react react-dom
3. Should be all set!

Possible Issues:
-- Two packages Meteor/templating and static-html want to render ".html" files
-- Solution: meteor remove templating
-----> removes templating package from repo