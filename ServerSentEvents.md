## Server Sent Events
	- One Request, a very very long response

## Limitation of Request/Response

- Vanilla Request/Response isn't ideal for notification backend
- Clients wants real time notification from backend
	- A user just logged in
	- A message is just received
- Push works but restrictive
- Server Sent Events work with Request/Response


## What is Server Sent Events?

- A response has start and end
- Client sends a request
- Server sends logical evensta as part of response
- Server never writes the end of the response
- It is still a request but and ending response
- Client parses the streams of data looking for these events


*Note: HTTP/1 does not work because it does not support streaming. HTTP/1.1 does*


## Pros
- Real time
- Compatible with Request/Response

## Cons
- Client must be online
- Client might not be able to handle ( Similar to Push Design pattern )
- Polling is preffered for light clients
- HTTP/1.1 problem (6 connections)
	- HTTP/1.1 does not allow more 6 connections on the same domain

## SSE using HTTP/1.1

```
	SERVER-SIDE
	'/api/test_endpoint'
		HEADER
			"Content-Type" : "text/event-stream"

	While sending data through response stream, in SSE, it passed as

	"Data: Some Data to send \n\n"

	Notice the key `Data:` and `\n\n` at the start and end respectively, this is required for sending data over stream in HTTP/1.1
```
