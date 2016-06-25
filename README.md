# @nodulus/config

 configuration component for nodulus.
  
 ### install
 `npm install @nodulus/config`
 
 
 ### usage
 ```
 var config=require("@nodulus/config").config;
 var consts=require("@nodulus/config").consts;
 
 var settings = config.appSettings;
 ```
 
 
 
 ### config file format 
 
 ```
 {
  "name": "nodulus",
  "url": "",
  "port": "4000",
  "appRoot": "/",
  "enableSockets": true,
  "database": {
    "mongodb": {
      "useObjectId": true,
      "host": "---mongo url---"
    }
    ||
    { "diskdb": { "host": "server/data" } }
  }
}
 
 ```
<<<<<<< HEAD:readme.md


 ### set config file location

```
 SET CONFIG_PATH = '--config--path--'
 
```
=======
>>>>>>> d268673ca3893d8c71df99231c8f47e68c3e75b9:README.md
