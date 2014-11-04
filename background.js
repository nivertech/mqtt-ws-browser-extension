/***** code below is compiled mqtt.js *****/

void 0===console&&(console={log:function(){}});
mqtt_protocol={rpc_topic:"/$SYS/rpc",types:{"0":"reserved",1:"connect",2:"connack",3:"publish",4:"puback",5:"pubrec",6:"pubrel",7:"pubcomp",8:"subscribe",9:"suback",10:"unsubscribe",11:"unsuback",12:"pingreq",13:"pingresp",14:"disconnect",15:"reserved",200:"rpc"},CMD_SHIFT:4,CMD_MASK:240,DUP_MASK:8,QOS_MASK:5,QOS_SHIFT:1,RETAIN_MASK:1,LENGTH_MASK:127,LENGTH_FIN_MASK:128,USERNAME_MASK:128,PASSWORD_MASK:64,WILL_RETAIN_MASK:32,WILL_QOS_MASK:24,WILL_QOS_SHIFT:3,WILL_FLAG_MASK:4,CLEAN_SESSION_MASK:2,codes:{}};
for(var k in mqtt_protocol.types){var v=mqtt_protocol.types[k];mqtt_protocol.codes[v]=k}mqtt_debug={on:function(){mqtt_util.log=function(a){console.log((new Date).toString()+" - "+a)}},off:function(){mqtt_util.log=function(){}}};
mqtt_util={array_to_string:function(a,d,b){str="";for(var c=0;c<b;++c)str+=String.fromCharCode(a[d+c]);return mqtt_util.utf8Decode(str)},utf8Decode:function(a){for(var d=String.fromCharCode,b=[],c,e,f,h,j=0,g=0;g<a.length;)c=a.charCodeAt(g++),127<c&&(e=a.charCodeAt(g++)),223<c&&(f=a.charCodeAt(g++)),239<c&&(h=a.charCodeAt(g++)),128>c?b[j++]=d(c):224>c?b[j++]=d((c-192<<6)+(e-128)):240>c?b[j++]=d((c-224<<12)+(e-128<<6)+(f-128)):b[j++]=d((c-240<<18)+(e-128<<12)+(f-128<<6)+(h-128));return b.join("")},
utf8Encode:function(a){for(var d=String.fromCharCode,b=[],c,e=0,f="";-1!=(c=a.search(/[^\x00-\x7F]/));){f=a.match(/([^\x00-\x7F]+[\x00-\x7F]{0,10})+/)[0];b[e++]=a.substr(0,c);var h=b,j=e++,g;g=f;for(var o=[],l=0;l<g.length;l++){var m=o,n=l,i;i=g.charCodeAt(l);i=128>i?d(i):2048>i?d(192+(i>>6))+d(128+(i&63)):65536>i?d(224+(i>>12))+d(128+(i>>6&63))+d(128+(i&63)):2097152>i?d(240+(i>>18))+d(128+(i>>12&63))+d(128+(i>>6&63))+d(128+(i&63)):-1;m[n]=i}g=o.join("");h[j]=g;a=a.substr(c+f.length)}b[e++]=a;return b.join("")},
log:function(){}};
mqtt_gen={number:function(a){return[a>>8,a&255]},string:function(a,d){2>arguments.length&&(d=!1);"string"!==typeof a&&(a=a.toString());if("boolean"!==typeof d)return null;for(var b=[],c=0,e=0;e<a.length;e++){var f=a.charCodeAt(e);if(128>f)b.push(f),++c;else if(2048>f)b.push(192+(f>>6)),++c,b.push(128+(f&63)),++c;else if(65536>f)b.push(224+(f>>12)),++c,b.push(128+(f>>6&63)),++c,b.push(128+(f&63)),++c;else if(2097152>f)b.push(240+(f>>18)),++c,b.push(128+(f>>12&63)),++c,b.push(128+(f>>6&63)),++c,b.push(128+
(f&63)),++c;else throw Error("Can't encode character with code "+f);}return d?b:mqtt_gen.number(c).concat(b)},length:function(a){if("number"!==typeof a||0>a)return null;var d=[],b=0;do b=a%128|0,a=a/128|0,0<a&&(b|=128),d.push(b);while(0<a);return d},connect:function(a){var d="mqtt_"+Math.floor(1E11*Math.random()),a=a||{},b=a.version||"MQIsdp",c=a.versionNum||3,e=a.will,f=void 0!==a.clean?a.clean:!0,h=a.keepalive||25,d=a.client||d,j=a.username,a=a.password,g={header:0,length:0,payload:[]};if("string"!==
typeof b||("number"!==typeof c||0>c||255<c)||"string"!==typeof d||("number"!==typeof h||0>h||65535<h)||"undefined"!==typeof e&&("string"!==typeof e.topic||"string"!==typeof e.payload))return null;g.header=mqtt_protocol.codes.connect<<mqtt_protocol.CMD_SHIFT;g.payload=g.payload.concat(mqtt_gen.string(b));g.payload.push(c);b=0|("undefined"!==typeof j?mqtt_protocol.USERNAME_MASK:0);b|="undefined"!==typeof a?mqtt_protocol.PASSWORD_MASK:0;b|=e&&e.retain?mqtt_protocol.WILL_RETAIN_MASK:0;b|=e&&e.qos?e.qos<<
mqtt_protocol.WILL_QOS_SHIFT:0;b|=e?mqtt_protocol.WILL_FLAG_MASK:0;b|=f?mqtt_protocol.CLEAN_SESSION_MASK:0;g.payload.push(b);g.payload=g.payload.concat(mqtt_gen.number(h));g.payload=g.payload.concat(mqtt_gen.string(d));e&&(g.payload=g.payload.concat(mqtt_gen.string(e.topic)).concat(mqtt_gen.string(e.payload)));b&mqtt_protocol.USERNAME_MASK&&(g.payload=g.payload.concat(mqtt_gen.string(j)));b&mqtt_protocol.PASSWORD_MASK&&(g.payload=g.payload.concat(mqtt_gen.string(a)));return g},subscribe:function(a){var a=
a||{},d=a.dup?mqtt_protocol.DUP_MASK:0,b=a.qos||0,c="undefined"===typeof a.messageId?Math.floor(65535*Math.random()):a.messageId,e=a.subscriptions,a=a.topic,f={header:0,payload:[]};if("number"!==typeof c||0>c||65535<c)return null;if("string"!==typeof a||0===a.length||"number"!==typeof b||0>b||2<b)if("object"!==typeof e||0===e.length)return null;f.header=mqtt_protocol.codes.subscribe<<mqtt_protocol.CMD_SHIFT|d|1<<mqtt_protocol.QOS_SHIFT;f.payload=f.payload.concat(mqtt_gen.number(c));if(a)f.payload=
f.payload.concat(mqtt_gen.string(a)),f.payload.push(b);else if(e)for(d=0;d<e.length;d++){a=e[d].topic;b=e[d].qos?e[d].qos:0;if("string"!==typeof a||0===a.length||"number"!==typeof b||0>b||2<b)return null;f.payload=f.payload.concat(mqtt_gen.string(a));f.payload.push(b|0)}else return null;return f},unsubscribe:function(a){var a=a||{},d="undefined"===typeof a.messageId?Math.floor(65535*Math.random()):a.messageId,b=a.topic,c=a.unsubscriptions,e={header:0,payload:[]};if("number"!==typeof d||0>d||65535<
d)return null;if("string"!==typeof b||0===b.length)if("object"!==typeof c||0===c.length)return null;e.header=mqtt_protocol.codes.unsubscribe<<mqtt_protocol.CMD_SHIFT|(a.dup?mqtt_protocol.DUP_MASK:0)|1<<mqtt_protocol.QOS_SHIFT;e.payload=e.payload.concat(mqtt_gen.number(d));if(b)e.payload=e.payload.concat(mqtt_gen.string(b));else if(c)for(a=0;a<c.length;a++){d=c[a];if("string"!==typeof d||0===d.length)return null;e.payload=e.payload.concat(mqtt_gen.string(d))}else return null;return e},publish:function(a){var a=
a||{},d=a.dup?mqtt_protocol.DUP_MASK:0,b=a.qos||0,c=a.retain?mqtt_protocol.RETAIN_MASK:0,e=a.topic,f=a.payload||"",a="undefined"===typeof a.messageId?Math.floor(65535*Math.random()):a.messageId,h={header:0,payload:[]};if("string"!==typeof e||0>=e.length||"string"!==typeof f||"number"!==typeof b||0>b||2<b||"number"!==typeof a||0>a||65535<a)return null;h.header=mqtt_protocol.codes.publish<<mqtt_protocol.CMD_SHIFT|d|b<<mqtt_protocol.QOS_SHIFT|c;h.payload=h.payload.concat(mqtt_gen.string(e));0<b&&(h.payload=
h.payload.concat(mqtt_gen.number(a)));h.payload=h.payload.concat(mqtt_gen.string(f,!0));return h},rpc:function(a,d){var b={};b.topic=mqtt_protocol.rpc_topic+"/"+a;b.payload="object"===typeof d?JSON.stringify(d):d;return mqtt_gen.publish(b)},pingreq:function(){return[mqtt_protocol.codes.pingreq<<4,0]},disconnect:function(){return[mqtt_protocol.codes.disconnect<<4,0]}};
mqtt_parse={string:function(a,d,b){var c=mqtt_parse.number(a,d,b);return null==c||c>b+d?null:[mqtt_util.array_to_string(a,b+2,c),c]},number:function(a,d,b){return 2>b+d?null:65536*a[b]+a[b+1]},header:function(a){var d={},b;d.cmd=mqtt_protocol.types[a[0]>>mqtt_protocol.CMD_SHIFT];d.retain=0!==(a[0]&mqtt_protocol.RETAIN_MASK);d.qos=(a[0]&mqtt_protocol.QOS_MASK)>>mqtt_protocol.QOS_SHIFT;d.dup=0!==(a[0]&mqtt_protocol.DUP_MASK);for(b=1;5>b&&a[b]&mqtt_protocol.LENGTH_FIN_MASK;++b);return[d,b+1]},connack:function(a){var d=
{};d.returnCode=mqtt_parse.number(a,a.length,0);return null==d.returnCode?null:d},suback:function(a){var d=a.length,b=0,c={granted:[]};c.messageId=mqtt_parse.number(a,d,b);if(null===c.messageId)return null;for(b+=2;b<d;)c.granted.push(a[b++]);return c},unsuback:function(){},publish:function(a){var d=a.length,b=0,c={};topic_and_length=mqtt_parse.string(a,d,b);c.topic=topic_and_length[0];if(null==c.topic)return null;b+=topic_and_length[1];c.messageId=mqtt_parse.number(a,d,b);if(null==c.messageId)return null;
b+=2;c.payload=mqtt_util.array_to_string(a,b,a.length-b);return c},pingresp:function(){return{}}};mqtt_verify={is_tn_valid:function(a){for(var d=a.length,b=0;b<d;++b)if(31>=a.charCodeAt(b)&&128<=a.charCodeAt(b))return!1;return-1===a.search(/[+#][^\/]/)&&-1===a.search(/[^\/][+#]/)&&0<d},is_tn_wildcard:function(a){return mqtt_verify.is_tn_valid(a)&&-1<a.search(/[#+]/)},is_tn_non_wildcard:function(a){return mqtt_verify.is_tn_valid(a)&&-1===a.search(/[#+]/)}};
function MqttClient(){var a=void 0,d,b=this,c=function(){b.pingreq();mqtt_util.log("waiting for pingresp");f=window.setTimeout(function(){mqtt_util.log("did not get pingresp, closing");a.close()},25E3)},e=window.setTimeout(c,25E3),f=void 0,h=function(d){d=b.encode(d);window.clearTimeout(e);e=window.setTimeout(c,25E3);a.send(d)},j={pingresp:function(a){mqtt_util.log("got pingresp, cancelling timer");window.clearTimeout(f);return[a,"pingresp"]},publish:function(a){return a.topic.substring(0,mqtt_protocol.rpc_topic.length)==
mqtt_protocol.rpc_topic?(a={payload:JSON.parse(a.payload)},[a,"rpc"]):[a,"publish"]}};b.message_handlers={};b.fail_handler=function(){};b.pingreq=function(){mqtt_util.log("sending ping");h(mqtt_gen.pingreq())};b.subscribe=function(a){h(mqtt_gen.subscribe(a))};b.unsubscribe=function(a){h(mqtt_gen.unsubscribe(a))};b.publish=function(a){mqtt_util.log("publish called");h(mqtt_gen.publish(a))};b.rpc=function(a,b){h(mqtt_gen.rpc(a,b))};b.will=void 0;b.username=void 0;b.password=void 0;b.connect=function(c,
e){var f="WebSocket"in window,m="WebSocket"in window||"MozWebSocket"in window,n=!("WebSocket"in window)&&"MozWebSocket"in window,i;m?(s=n?new MozWebSocket("ws://example.ws_test/"):new WebSocket("ws://example.ws_test/"),i="binaryType"in s):i=!1;d=i?"mqtt":"mqttb64";a=f?new WebSocket(c,d):n?new MozWebSocket(c,d):new SockJS(e);m?mqtt_util.log("Connecting via websocket"):mqtt_util.log("Connecting via sockjs");a.binaryType="arraybuffer";a.onmessage=function(a){a=a.data;if(d=="mqtt")a=new Uint8Array(a);
else if(d=="mqttb64")for(var c=window.atob(a),a=[],e=0;e<c.length;++e)a[e]=c.charCodeAt(e);var e=mqtt_parse.header(a),c=e[0],e=e[1],f=c.cmd;d=="mqtt"?a=new Uint8Array(a.buffer,e):d=="mqttb64"&&(a=a.slice(e));c=mqtt_parse[f](a);if(f in j){packet_and_type=j[f](c);c=packet_and_type[0];f=packet_and_type[1]}if(f in b.message_handlers)b.message_handlers[f](c,b)};a.onopen=function(){var a=mqtt_gen.connect({will:b.will,username:b.username,password:b.password});h(a)};a.onclose=function(){b.fail_handler()};
a.onerror=a.onclose};b.encode=function(a){if("mqtt"==d){if("header"in a){var b=mqtt_gen.length(a.payload.length);return(new Uint8Array([a.header].concat(b).concat(a.payload))).buffer}return(new Uint8Array(a)).buffer}if("mqttb64"==d){var c;if("header"in a){b=mqtt_gen.length(a.payload.length);c=String.fromCharCode(a.header);for(var e=0;e<b.length;++e)c+=String.fromCharCode(b[e]);for(e=0;e<a.payload.length;++e)c+=String.fromCharCode(a.payload[e])}else{c="";for(e=0;e<a.length;e++)c+=String.fromCharCode(a[e])}return window.btoa(c)}}}
;

/***** end of compiled mqtt.js *****/

var counter = 0;
var newColor = [255, 0, 0, 255]; //red


function buttonClick() {
  if (counter===0) alert("Thank you for clicking my app's button!");
  
  counter++;

  if (appAPI.platform == "CH") {
    //show the number of clicks at as badge on the button icon
    appAPI.chrome.browserAction.setBadgeText(counter.toString());
    
    //each click change the color between red and green
    if ((counter % 2) !== 0) newColor = [255, 0, 0, 255]; //red
      else newColor = [0, 200, 0, 100]; //green
    appAPI.chrome.browserAction.setBadgeBackgroundColor(newColor);
    
    //set the tooltip of the button
    appAPI.chrome.browserAction.setTitle("you clicked the button " + counter.toString() + " times");
    
    //switch to a new icon
    appAPI.chrome.browserAction.setIcon((counter % 5)+1);
  }
  
  //this app changes the button icon on each click.
  if (appAPI.platform == "FF") {
    appAPI.firefox.browserAction.setIcon((counter % 5)+1); 
    appAPI.firefox.browserAction.setTitle("you clicked the button " + counter.toString() + " times");
  } 
  
  //NOTE: all JS and API functions are identical for all platforms with one exception of browser specific API's such as toolbar button (as each browser has different capabilities)

}



if (appAPI.platform == "FF") {
  //set the browser button onClick function for Firefox
  appAPI.firefox.browserAction.onClick(buttonClick);
  
  //Firefox doesn't put the icon by default so we need to "call it" - setIcon with no param is like setIcon(1)
  appAPI.firefox.browserAction.setIcon(); 
}
var mqtt_client;

//set the browser button onClick function for Chrome
if (appAPI.platform == "CH") appAPI.chrome.browserAction.onClick(buttonClick);

var ERROR_INTERVAL_IN_MS = 5000;

var HOST_WS = "ws://mqttws.zadata.com:8080";
var HOST_SOCKJS = "http://sockjs.zadata.com:80/sockjs";

function waitmsg() {
	mqtt_client = new MqttClient();
	mqtt_client.message_handlers = {
		publish: function(packet, mqtt_client) {
			if (appAPI.platform == "CH")
				appAPI.chrome.browserAction.setBadgeText(packet.payload)
		},
		connack: function(packet, mqtt_client) {
			mqtt_client.subscribe({topic: "/bitcoin/data/exchange/mtgox/ticker/BTC/buy"});
		}
	}
	mqtt_client.fail_handler = function() {
		setTimeout(waitmsg, ERROR_INTERVAL_IN_MS);
	}
	mqtt_client.username = "cddemo";
	mqtt_client.password = "cdpass";
	mqtt_client.connect(HOST_WS, HOST_SOCKJS);
}
waitmsg();
