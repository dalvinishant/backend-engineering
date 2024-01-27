
```
	# Multiplexing
	Multiplexing is sending multiple requests over single connection


					|					|
	3 HTTP/1.1 Conn			|					|
	RQ1				|					|
	----->				|		REVERSE			|	1 HTTP/2 Connection
	RQ2				|		PROXY			|	RQ3		RQ2		RQ1
	----->				|					|	-----> -----> ----->
	RQ3				|					|
	----->				|					|

	# Demultiplexing
	Demultiplexing is routing multrequests to different sources

							|						|	3 HTTP/1.1 Connections
	1 HTTP/2 Connection				|						|	RQ1
	RQ3		RQ2		RQ1		|						|	----->
	-----> 		-----> 		----->		|		REVERSE				|
							|		PROXY				|	RQ2
							|						|	----->
							|						|
							|						|	RQ3
							|						|	----->
```

## Multiplexing

- This is typically used with HTTP/2 where multiple requests from a single client can be sent over single connection to the server
- HTTP/1.1 does not support multiplexing, however it supports six concurrent connections to a single domain server

## Demultiplexing

-  Consider a HTTP/2 connection is received from client having multiplexed requests.
- Reverse Proxy converts these multiplexed requests into individual requests and sends them over individual connection with HTTP/1.1
