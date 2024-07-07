## Version Details
- NodeJs - v20.12.2
- nvm - v0.39.7
- React - v18.3.1

## To run the application 
Note: To run this application you have to run the [Backend application](https://github.com/siddhesh494/Restaurant_Admin-Server) first and then run [Frontend application](https://github.com/siddhesh494/Restaurant_Admin-Web).

Befor running both the application use `npm install` or `yarn install` to install the dependent packages.

### To run the Backend application use command
```
npm start
```
Along with that past below variable in `.env` file
```
PORT=4000
mongoUser="siddheshss26"
mongoPassword="YHdZlTJTSqv5NyhB"
mongoDatabase="Restaurant_admin"
mongoPort="27017"
```

### To run the Frontend application
```
npm start
```

## About This Project
- FoodieDelight is a food delivery application, as a part of this application, I have build a functionality that manage different restaurant and their menus.
- For Frontend i have use React to develop the application, for styling i have use tailwindCSS along with normal css for easy styling. 
- ForBackend i have use NodeJS, Express to develop the application, for database I have use mongoDB for easy storing data. I have also use typescript as javascript has dynamic variable, which can give error during runtime. For Validating request body in API i have use `joi` validation.
- For Database I have use mongoDB Atlas, whihc is fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service.
- To indentify the error on production I have use `bunyan` logger

## Tracking
- For design the application (Which include FrontEnd design/functionality, file structure, API structure) it took almost 1.5 - 2 hours.
- For coding the Frontend it took almost 8 - 9 hours.
- For Backend it took almost 3-4 hours.