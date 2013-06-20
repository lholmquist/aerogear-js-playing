/**
 * JBoss, Home of Professional Open Source
 * Copyright Red Hat, Inc., and individual contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
load('vertx.js');

var server = vertx.createHttpServer();

// global ev...
var eb = vertx.eventBus;


// Inspired from Sinatra / Express
var rm = new vertx.RouteMatcher();

rm.get('/test/', function(req) {
  // Publish to the Event bus....
  req.response.end();
  var json = { text: "New Item (ID:" + Math.random() + ") created!" };
  console.log("Queued message...");
  eb.publish("org.aerogear.messaging.global", json);

});
// Catch all - serve the index page
rm.getWithRegEx('.*', function(req) {
  //if (req.uri == "/rest") req.response.sendFile("route_match/index.html")
  if (req.path === "/") {
    console.log( "index.html" );
    req.response.sendFile( "index.html" );
  } else {
      // meh...
      console.log( req.path );
      req.response.sendFile( "./" + req.path );
  }
});

// 'deploy:
server.requestHandler(rm);


// Create a SockJS bridge which lets everything through (be careful!)
vertx.createSockJSServer(server).bridge({prefix: "/eventbus"}, [{}], [{}]);

server.listen(8080, '0.0.0.0');
