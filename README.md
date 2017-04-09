**Setup**

run mongodb - settings from server/config/environment/development.js -> mongo.uri

> service mongo start

or 

> mongod --dbpath /path/to/mongo-db/files

run postfix for registration/reset-password logic

node >=v4.4.5

> npm install -g grunt-cli

> npm install -g bower

> npm install

> bower install

Registration emails for test purposes: http://no-spam.ws/ 

After every stop server - users and posts reloaded from 
    server/api/posts/post.seed.json, server/api/users/user.seed.json

To run application - write in console:

> grunt server
