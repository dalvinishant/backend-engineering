## Publish Subscribe
	- One publisher many readers

## Request/Response Issue with multiple servers
- Request/Response is simple and elegant, yet, when it comes to multiple microservices, client has to wait for a long (very in some cases) time
- This is because, in case of multiple microservices, one request from client could internally trigger multiple requests to other services.
- Moreover, if one such internal request fails, the entire transaction fails, which means the client(user) has to restart
- Not to mention, the client has to be connected all the time

## Pub-Sub model

- In Pub-Sub model, there is a publishers and one or more subscribers
- Publisher push their content(message) onto a topic
- Topics lie on a broker from where subscribers consume the from topic
- Subscribers do long polling(in case of kafka) or get the message from a topic they have subscribed to

- In a microservice setup, 1 microservice can be a publisher as well as a subscriber
- It can subscribe to one or more topics and at the same time publish to multiple topics

## How does this solve the Request/Response limitation?

- Client makes a request to one of microservice
- Microservice, internally publishes the message onto a topic
- Client can disconnect at this point and check back later
- Microservices processing the request, use broker to publish onto topics
- Other microservices listening to the topics, consume the message
- This goes on until the entire flow is completed.

## Pros

- Scales with multiple receivers
- Great for microservices
- Loose Coupling
- Works while client not running

## Cons

- Message delivery issues ( Two generals problem )
- Complexity
- Network Saturation
	- Lot of clients try polling, that leads to network overhead

