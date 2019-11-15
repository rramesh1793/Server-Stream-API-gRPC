var greets = require('../server/protos/greet_pb')
var service = require('../server/protos/greet_grpc_pb')

var grpc = require('grpc')

let unsafeCreds = grpc.credentials.createInsecure();
var services = require('../server/protos/dummy_grpc_pb')

function callGreetings() {

    console.log('Hello from client');

      // Created our server client
  var client = new service.GreetServiceClient("localhost:50051", unsafeCreds);
/*var client = new service.GreetServiceClient(
    'localhost:50051',       //invoke server through 50051             
    grpc.credentials.createInsecure()
) */

//we do stuff

//req and greeting in greet.proto
var request = new greets.GreetRequest();

//created a protocol buffer greeting message
var greeting = new greets.Greeting();

greeting.setFirstName("Jerry");
greeting.setLastName("Tom");


//set the Greeting 
request.setGreeting(greeting);

//calling greet rpc method
client.greet(request, (error, response) => {

    if(!error) {
        console.log("Greeting Response:", response.getResult());
    }
    else
    {
        console.error(error);

    }

});
}

function callGreetManyTimes() {
    // Created our server client
    var client = new service.GreetServiceClient(
      "localhost:50051",
      grpc.credentials.createInsecure()
    );
  
    // create request
  
    var request = new greets.GreetManyTimesRequest();
  
    var greeting = new greets.Greeting();
    greeting.setFirstName("Paulo");
    greeting.setLastName("Dichone");
  
    request.setGreeting(greeting);   //passing your greeting that is set
  
    var call = client.greetManyTimes(request, () => {});
  
    call.on("data", response => {                                         //data is nothing but events
      console.log("Client Streaming Response: ", response.getResult());
    });
  
    call.on("status", status => {
      console.log(status.details);
    });
  
    call.on("error", error => {
      console.error(error.details);
    });
  
    call.on("end", () => {
      console.log("Streaming Ended!");
    });
  }




function main(){

   // callGreetings();
    callGreetManyTimes();
}

main();

