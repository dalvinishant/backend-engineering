
## Long Polling
	- Request is taking long, I'll check with you later
		- But talk to me only when it's ready

## WHERE Request/Response & Short Polling isn't ideal

- A request takes long time to process
	- Upload a youtube video
- The backend wants to a send notification
	- A user just logged in
- Short Polling is a good option but its chatty (i.e constant short interval polling until we get the result)

- Meet long polling ( Kafka Uses it )
	- In Kafka, consumers do a long polling
	- Kafka, in return does not respond immediately to the client
	- Only on receiving something on the topic which consumer has subscribed to, kafka returns a response.

## What is Long Polling?

- Client sends a request
- Sever responds immediately with a handle
- Server continues to process the request
- Client uses that handle to check for the status
- Server DOES NOT reply until it has the response
	- So we got a handle, we can disconnct and we are less chatty
	- Some variations have timeout too

*Note: RabbitMQ uses the Push model, whereas Kafka uses Long Polling*

# Pros
- Less Chatty and backend friendly
- Client can still disconnect

# Cons
- Not Real time
	- Consider Kafka
		- Message that consumer recieves at that instant is real-time (or close to)
		- However, if there is a message recieved BETWEEN the kafka returning the response, or after kafka returned the response, Consumer still has to poll again in order to fetch the message