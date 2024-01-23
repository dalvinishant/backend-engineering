
## Request/Response isn't always ideal

- Client wants real time notification from backend
	- Notification when a user logs in

## What is Push

- Client connects to a server
- Server sends the data to the client
- Client doesn't have to request anything
- Protocol ideally must be bidirectional
- Used by RabbitMQ
	- RabbitMQ pushes the message to its consumers

## Pros and Cons

- Pros
	- Real Time: As soon event occurs, data is sent to the client
- Cons
	- Clients must be online ( i.e  must be connected to the server )
	- Fire and Forget: client might not able to handle
	- Requires a bidirectional protocol
	- Polling is preffered for light clients