var notifierVertx = AeroGear.Notifier(),
    notifierVertx2,
    notifierStomp,
    stompChannel,
    channelObject;

channelObject = {
    address: "org.aerogear.messaging.global",
    callback: channelCallback
};

stompChannel = {
    address: "jms.topic.chat",
    callback: stompChannelCallback
};

function stompChannelCallback( message ) {
    console.log( message );
}

function channelCallback( message ) {
    console.log( message );
}

function channelUnsubscribe( channel ) {
    notifierVertx.clients.client1.unsubscribe( channel );
}

notifierVertx.add({
    name: "client1",
    settings: {
        autoConnect: true,
        connectURL: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + "/eventbus",
        onConnect: function() {
            console.log( "connected" );
        },
        onConnectError: function() {
            console.log( "connection error" );
        },
        onDisconnect: function() {
            console.log( "Disconnected" );
        },
        channels: [ channelObject ]
    }
});


notifierVertx2 = AeroGear.Notifier({
    name: "client2",
    settings: {
        autoConnect: true,
        connectURL: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + "/eventbus",
        onConnect: function() {
            console.log( "connected" );
        },
        onConnectError: function() {
            console.log( "connection error" );
        },
        onDisconnect: function() {
            console.log( "Disconnected" );
        },
        channels: [ channelObject ]
    }
});


notifierStomp = AeroGear.Notifier({
    name: "stompClient",
    type: "stompws",
    autoConnect: true,
    settings: {
        onConnect: function() {
        console.log( "connected" );
    },
    onConnectError: function( event ) {
        console.log( "connection error", event );
    },
    onDisconnect: function() {
        console.log( "Disconnected" );
    },
        connectURL: "ws://localhost:61614/stomp",
        channels: [ stompChannel ]
    }
});

/*notifierStomp.clients.stompClient.connect({
    login: "guest",
    password: "guest"
    /*onConnect: function() {
        console.log( "connected" );
    },
    onConnectError: function( event ) {
        console.log( "connection error", event );
    },
    onDisconnect: function() {
        console.log( "Disconnected" );
    }*/
/*});*/


function stompUnsubscribe( channel ) {
    notifierStomp.clients.stompClient.unsubscribe( channel );
}



