

## Request Response : Classic, Simple and Everywhere

- Client sends a Request
	- What does it mean ?
	- Its continues stream of data
- Server parses the Request
	- It needs to understand what a Request is, where does it start, where does it end ?
- Server processes the Request
	- Parsing a Request and actually executing the request are 2 different things
	- Executing a request may involve doing some DB calls and returning the response
- Server sends a Response
	- Client needs to know if what its receiving is a response, where does it start, where does it end?
- Client parses the Response and consume


## Where is Request Response being used?

- Web, HTTP, DNS, SSH
- RPC (Remote Procedure Call)
	- Send a request that happens to be on a remote server
	- RPC also
- SQL and Database Protocols
	- Send a query to the database
	- Parses the query
	- Prepares the plan
	- Actually executes the plan
	- Forms the data
	- Returns the response
- APIs (REST/SOAP/GraphQL)

## Anatomy of a Request / Response

- A Request stucture is defined by both client and server and they have to agree on it based on the protocol being used
- A typical GET would something like this
```
GET/HTTP/1.1
Headers
<CRLF>
BODY
```
- Based on type of communication(protocol) being used, servers communicating, take care of forming this structures.
- Request has a boundary which is defined by a protocol and message format
- Above is same for a Response

## Usecases for Request Response

- Building an upload image service with request response
	- Lets say we want to build an image upload from clien to server
	- We send a large image in a single request
		- This is doable but scalable or resumeable
	- Or we can send multiple chunks of 1 large image
		- This way server is aware of chunks that its receiving and can discard if there is any network outage
		- And its resumable

## Not a usecase for Request Response

- Notification Service
- Chatting application
- Very long requests

```
		Client											Server
			|												|
	t-2		|												|
			|												|
			|												|
	t0		|---------------------------------------							|
			|					|							|
	t2		|					--------------------------------------------------------|
			|												|
			|												|
			|												|
			|												|
			|												|
	t30		|					--------------------------------------------------------|
			|					|							|
	t32		|----------------------------------------							|
			|												|
			|												|
	t34		|												|

t-2 to t0
	- Time taken to form the Request

t0 to t2
	- Time taken to sent the request over the network

t2 to t30
	- Time taken by server to process the request + to form the response

t30 to t32
	- Time taken by server to return the response over the network

t32 to t34
	- Time taken to parse the response
```

### Demo using Curl

- Run the following commands in terminal
```
terminal$: curl -v --trace RequestResponsePractical.txt http://google.com

Warning: --trace overrides an earlier trace/verbose option
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/">here</A>.
</BODY></HTML>

terminal$: cat RequestResponsePractical.txt

== Info:   Trying [2404:6800:4009:822::200e]:80...
== Info: Connected to google.com (2404:6800:4009:822::200e) port 80 (#0)
=> Send header, 73 bytes (0x49) --> (These are Request Headers)
0000: 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31 0d 0a GET / HTTP/1.1..
0010: 48 6f 73 74 3a 20 67 6f 6f 67 6c 65 2e 63 6f 6d Host: google.com
0020: 0d 0a 55 73 65 72 2d 41 67 65 6e 74 3a 20 63 75 ..User-Agent: cu
0030: 72 6c 2f 38 2e 31 2e 31 0d 0a 41 63 63 65 70 74 rl/8.1.1..Accept
0040: 3a 20 2a 2f 2a 0d 0a 0d 0a                      : */*....
<= Recv header, 32 bytes (0x20) --> (These are Response Headers)
0000: 48 54 54 50 2f 31 2e 31 20 33 30 31 20 4d 6f 76 HTTP/1.1 301 Mov
0010: 65 64 20 50 65 72 6d 61 6e 65 6e 74 6c 79 0d 0a ed Permanently..
<= Recv header, 34 bytes (0x22)
0000: 4c 6f 63 61 74 69 6f 6e 3a 20 68 74 74 70 3a 2f Location: http:/
0010: 2f 77 77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d 2f /www.google.com/
0020: 0d 0a                                           ..
<= Recv header, 40 bytes (0x28)
0000: 43 6f 6e 74 65 6e 74 2d 54 79 70 65 3a 20 74 65 Content-Type: te
0010: 78 74 2f 68 74 6d 6c 3b 20 63 68 61 72 73 65 74 xt/html; charset
0020: 3d 55 54 46 2d 38 0d 0a                         =UTF-8..
<= Recv header, 245 bytes (0xf5)
0000: 43 6f 6e 74 65 6e 74 2d 53 65 63 75 72 69 74 79 Content-Security
0010: 2d 50 6f 6c 69 63 79 2d 52 65 70 6f 72 74 2d 4f -Policy-Report-O
0020: 6e 6c 79 3a 20 6f 62 6a 65 63 74 2d 73 72 63 20 nly: object-src
0030: 27 6e 6f 6e 65 27 3b 62 61 73 65 2d 75 72 69 20 'none';base-uri
0040: 27 73 65 6c 66 27 3b 73 63 72 69 70 74 2d 73 72 'self';script-sr
0050: 63 20 27 6e 6f 6e 63 65 2d 49 74 70 6b 55 62 31 c 'nonce-ItpkUb1
0060: 6b 6e 4b 39 6b 34 30 68 4e 63 74 45 74 47 67 27 knK9k40hNctEtGg'
0070: 20 27 73 74 72 69 63 74 2d 64 79 6e 61 6d 69 63  'strict-dynamic
0080: 27 20 27 72 65 70 6f 72 74 2d 73 61 6d 70 6c 65 ' 'report-sample
0090: 27 20 27 75 6e 73 61 66 65 2d 65 76 61 6c 27 20 ' 'unsafe-eval'
00a0: 27 75 6e 73 61 66 65 2d 69 6e 6c 69 6e 65 27 20 'unsafe-inline'
00b0: 68 74 74 70 73 3a 20 68 74 74 70 3a 3b 72 65 70 https: http:;rep
00c0: 6f 72 74 2d 75 72 69 20 68 74 74 70 73 3a 2f 2f ort-uri https://
00d0: 63 73 70 2e 77 69 74 68 67 6f 6f 67 6c 65 2e 63 csp.withgoogle.c
00e0: 6f 6d 2f 63 73 70 2f 67 77 73 2f 6f 74 68 65 72 om/csp/gws/other
00f0: 2d 68 70 0d 0a                                  -hp..
<= Recv header, 37 bytes (0x25)
0000: 44 61 74 65 3a 20 53 75 6e 2c 20 32 31 20 4a 61 Date: Sun, 21 Ja
0010: 6e 20 32 30 32 34 20 30 37 3a 34 35 3a 33 33 20 n 2024 07:45:33
0020: 47 4d 54 0d 0a                                  GMT..
<= Recv header, 40 bytes (0x28)
0000: 45 78 70 69 72 65 73 3a 20 54 75 65 2c 20 32 30 Expires: Tue, 20
0010: 20 46 65 62 20 32 30 32 34 20 30 37 3a 34 35 3a  Feb 2024 07:45:
0020: 33 33 20 47 4d 54 0d 0a                         33 GMT..
<= Recv header, 40 bytes (0x28)
0000: 43 61 63 68 65 2d 43 6f 6e 74 72 6f 6c 3a 20 70 Cache-Control: p
0010: 75 62 6c 69 63 2c 20 6d 61 78 2d 61 67 65 3d 32 ublic, max-age=2
0020: 35 39 32 30 30 30 0d 0a                         592000..
<= Recv header, 13 bytes (0xd)
0000: 53 65 72 76 65 72 3a 20 67 77 73 0d 0a          Server: gws..
<= Recv header, 21 bytes (0x15)
0000: 43 6f 6e 74 65 6e 74 2d 4c 65 6e 67 74 68 3a 20 Content-Length:
0010: 32 31 39 0d 0a                                  219..
<= Recv header, 21 bytes (0x15)
0000: 58 2d 58 53 53 2d 50 72 6f 74 65 63 74 69 6f 6e X-XSS-Protection
0010: 3a 20 30 0d 0a                                  : 0..
<= Recv header, 29 bytes (0x1d)
0000: 58 2d 46 72 61 6d 65 2d 4f 70 74 69 6f 6e 73 3a X-Frame-Options:
0010: 20 53 41 4d 45 4f 52 49 47 49 4e 0d 0a           SAMEORIGIN..
<= Recv header, 2 bytes (0x2)
0000: 0d 0a                                           ..
<= Recv data, 219 bytes (0xdb) --> (This is Response body)
0000: 3c 48 54 4d 4c 3e 3c 48 45 41 44 3e 3c 6d 65 74 <HTML><HEAD><met
0010: 61 20 68 74 74 70 2d 65 71 75 69 76 3d 22 63 6f a http-equiv="co
0020: 6e 74 65 6e 74 2d 74 79 70 65 22 20 63 6f 6e 74 ntent-type" cont
0030: 65 6e 74 3d 22 74 65 78 74 2f 68 74 6d 6c 3b 63 ent="text/html;c
0040: 68 61 72 73 65 74 3d 75 74 66 2d 38 22 3e 0a 3c harset=utf-8">.<
0050: 54 49 54 4c 45 3e 33 30 31 20 4d 6f 76 65 64 3c TITLE>301 Moved<
0060: 2f 54 49 54 4c 45 3e 3c 2f 48 45 41 44 3e 3c 42 /TITLE></HEAD><B
0070: 4f 44 59 3e 0a 3c 48 31 3e 33 30 31 20 4d 6f 76 ODY>.<H1>301 Mov
0080: 65 64 3c 2f 48 31 3e 0a 54 68 65 20 64 6f 63 75 ed</H1>.The docu
0090: 6d 65 6e 74 20 68 61 73 20 6d 6f 76 65 64 0a 3c ment has moved.<
00a0: 41 20 48 52 45 46 3d 22 68 74 74 70 3a 2f 2f 77 A HREF="http://w
00b0: 77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d 2f 22 3e ww.google.com/">
00c0: 68 65 72 65 3c 2f 41 3e 2e 0d 0a 3c 2f 42 4f 44 here</A>...</BOD
00d0: 59 3e 3c 2f 48 54 4d 4c 3e 0d 0a                Y></HTML>..
== Info: Connection #0 to host google.com left intact

```
