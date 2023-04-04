const express = require("express");
const winston = require("winston");
const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
    new winston.transports.Console({
    format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
   });

app.get('', (req, res)=>{
    res.send("This is a simple calculator RestFull API.");
    }
 );

function isValidNumber(num1, num2){
    if(isNaN(num1) || isNaN(num2))
    {
      return false;
    }
    else
    {
      return true;
    }
}

 app.get('/add/:num1/:num2', function (req, res) {
    var response = "";
    var responseStatus = 200;

    //Validations
    if(!isValidNumber(req.params.num1, req.params.num2)){
      response = "Please enter valid numbers.";
      responseStatus = 400;
    }

    //fetching parameters
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);

    //operation
    if(responseStatus === 200){    
      var sum = (num1 + num2).toString();
      response = "Sum of " + num1 + " and "+ num2 +" is: " + sum;
    }

    //logging
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var logMessage = "New Add operation requested ";
    logMessage += req.params.num1 + " + " + req.params.num2;
    logMessage += " The request url is: " + fullUrl;
    logMessage += " Ip address of client is: " + req.socket.remoteAddress;
    logMessage += " Response Status is: " + responseStatus;
    logMessage += " Response body is: " + response;
    logger.log("info", logMessage);

    //sending responnse
    res.status(responseStatus).send(response);
});

app.get('/subtract/:num1/:num2', function (req, res) {
    var response = "";
    var responseStatus = 200;

    //Validations
    if(!isValidNumber(req.params.num1, req.params.num2)){
      response = "Please enter valid numbers.";
      responseStatus = 400;
    }

    //fetching parameters
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);

    //operation
    if(responseStatus === 200){    
      var difference = (num1 - num2).toString();
      response = "Subtraction of " + num1 + " and "+ num2 +" is: " + difference;
    }

    //logging
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var logMessage = "New subtract operation requested ";
    logMessage += req.params.num1 + " - " + req.params.num2;
    logMessage += " The request url is: " + fullUrl;
    logMessage += " Ip address of client is: " + req.socket.remoteAddress;
    logMessage += " Response Status is: " + responseStatus;
    logMessage += " Response body is: " + response;
    logger.log("info", logMessage);

    //sending responnse
    res.status(responseStatus).send(response);
  })
  
  app.get('/multiply/:num1/:num2', function (req, res) {
      var response = "";
      var responseStatus = 200;

      //Validations
      if(!isValidNumber(req.params.num1, req.params.num2)){
        response = "Please enter valid numbers.";
        responseStatus = 400;
      }

      //fetching parameters
      var num1 = parseInt(req.params.num1);
      var num2 = parseInt(req.params.num2);

      //operation
      if(responseStatus === 200){
        var product = (num1 * num2).toString();
        response = "Multiplication of " + num1 + " and "+ num2 +" is: " + product;
      }

      //logging
      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      var logMessage = "New multiply operation requested ";
      logMessage += req.params.num1 + " * " + req.params.num2;
      logMessage += " The request url is: " + fullUrl;
      logMessage += " Ip address of client is: " + req.socket.remoteAddress;
      logMessage += " Response Status is: " + responseStatus;
      logMessage += " Response body is: " + response;
      logger.log("info", logMessage);

      //sending responnse
      res.status(responseStatus).send(response);
  })
  
  app.get('/divide/:num1/:num2', function (req, res) {
    var response = "";
    var responseStatus = 200;

    //Validations
    if(!isValidNumber(req.params.num1, req.params.num2)){
      response = "Please enter valid numbers.";
      responseStatus = 400;
    }

    if(req.params.num2 == 0){
      response = "Divisor number cannot be zero.";
      responseStatus = 400;
    }

    //fetching parameters
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);

    //operation
    if(responseStatus === 200){   
      var quotient = (num1 / num2).toString();
      response = "Division of " + num1 + " and "+ num2 +" is: " + quotient;
    }

    //logging
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var logMessage = "New divide operation requested ";
    logMessage += req.params.num1 + " / " + req.params.num2;
    logMessage += " The request url is: " + fullUrl;
    logMessage += " Ip address of client is: " + req.socket.remoteAddress;
    logMessage += " Response Status is: " + responseStatus;
    logMessage += " Response body is: " + response;
    logger.log("info", logMessage);
    
    //sending responnse
    res.status(responseStatus).send(response);
  })
  

  app.get("*", function (req, res) {
    res.send("<html>Please use a correct url as given below: <br> For Addition <a href='http://localhost:3000/add/6/2'> http://localhost:3000/add/6/2 </a> <br> For Subtraction <a href='http://localhost:3000/subtract/6/2'> http://localhost:3000/subtract/6/2 </a>  <br> For Multiplcation <a href='http://localhost:3000/multiply/6/2'> http://localhost:3000/multiply/6/2 </a>  <br> For Division <a href='http://localhost:3000/divide/6/2'> http://localhost:3000/divide/6/2 </a> </html>");   
  });

  app.listen(3000, function () {
    console.log('Successfully started calculator-microservice application!');
  })