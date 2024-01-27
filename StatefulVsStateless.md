## Stateful Backend

- Stores state about the client in its memory
- Depends on the information being there
	- It depends on the information in order to function properly

## Stateless Backend

- Client is responsible to "transfer the state" with every request
- May store the state but can safely lose it
- Stateless backend can store state somewhere else (database)
- The backend remain stateless but the system is stateful
- Can you restart the backend during the idle time and the client workflow continue to work?

## Stateless Client

- Stateless backends can still store data somewhere else
- Can you restart the backend during idle time, while the client workflow continues to work?
	- If yes, your application is stateless

## Stateful vs Stateful protocols

- The protocols can be designed to state state
- TCP is stateful
- UDP is stateless
	- DNS send queryID in UDP to identify queries
- You can build a stateless protocol on top of a statful one and vise versa
	- HTTP on top of TCP
	- If TCP breaks, HTTP blindly create another one
- QUIC on top of UDP

## What is a complete stateless system?

- Stateless Systems are rare
- State is carried with every request
- A backend service that relies completely on the inpur
	- For E.g: Check if input param is a prime number
- JWT(JSON Web Token)
