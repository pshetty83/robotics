var nforce = require('/usr/local/lib/node_modules/nforce');
var http = require('http'),
    faye = require('/usr/local/lib/node_modules/faye');
var PythonShell = require('/usr/local/lib/node_modules/python-shell');
var client;
 
var AckCounter = 0;
 
/* ===================== SET THESE VARIABLES*/
var sfuser = "";
/* sfpass must have your security token */
var sfpass = "";
 
var org = nforce.createConnection({
  clientId: '3MVG9xOCXq4ID1uFdyfJeeY7CvqLiFFqE1QskNrGJZae5Z.yUNlbwAbE.17IsmgwiFFef_BFY_ESogAQnSxOO',
  clientSecret: '4674645782648018527',
  redirectUri: 'http://localhost:3000/oauth/_callback'
});
  
console.log("Welcome to Robot Controller");
 
function handleStreamingAPI(_oauth) {
    client = new faye.Client(_oauth.instance_url + '/cometd/31.0');
    client.setHeader("Authorization", "OAuth " + _oauth.access_token);
    var subscription = client.subscribe('/topic/RobotMotion', 
                                        function(message) { console.log(message.sobject.Action__c + "\n");
	                                                          handleMessage(message.sobject.Action__c);
                                                          });
     console.log("Streaming API Connected...");    
}
 
function handleMessage(message) {
	console.log("Action: " + message);
	if (message == 'rattle') 
  {
    var pyshell = new PythonShell('test.py');

    pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
    });

    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
      if (err) throw err;
      console.log('finished');
    });

	} 
  else if (message == 'strike') 
  {
		/*PythonShell.run('LEGO-Motor_Test_Stop.py', 
                    function(err){ if(err) throw err;
			                             console.log('strike finished');
		                             });*/
	}
  else if (message == 'forward') 
  {
    /*PythonShell.run('LEGO-Motor_Test_Stop.py', 
                    function(err){ if(err) throw err;
                                   console.log('forward finished');
                                 });*/
  } 
  else if (message == 'left') 
  {
    /*PythonShell.run('LEGO-Motor_Test_Stop.py', 
                    function(err){ if(err) throw err;
                                   console.log('left finished');
                                 });*/
  } 
  else if (message == 'stop') 
  {
    /*PythonShell.run('LEGO-Motor_Test_Stop.py', 
                    function(err){ if(err) throw err;
                                   console.log('stop finished');
                                 });*/
  } 
  else if (message == 'right') 
  {
    /*PythonShell.run('LEGO-Motor_Test_Stop.py', 
                    function(err){ if(err) throw err;
                                   console.log('right finished');
                                 });*/
  } 
  else if (message == 'reverse') 
  {
    /*PythonShell.run('LEGO-Motor_Test_Stop.py', 
                    function(err){ if(err) throw err;
                                   console.log('reverse finished');
                                 });*/
  } 
}
 
function heartbeat() {
	AckCounter++;
	console.log("Ready and waiting [" + AckCounter + "]");
	setTimeout(function() { heartbeat(); }, 10000);
}
 
 
 
var displayResult = function(result) {
    console.log(result);
};
 
var displayError = function(err) {
    console.error(err);
};
 
 
 
console.log("Authenticating with Salesforce");
 
org.authenticate({ username: sfuser, password: sfpass}, function(err, oauth) {
  if(err) {
    console.error('unable to authenticate to sfdc');
    console.log(err);
    process.exit(code=0);
  } else {
    console.log("authenticated");
    console.log("oauth");
    console.log(oauth);
    handleStreamingAPI(oauth);	
	heartbeat();
 }
});