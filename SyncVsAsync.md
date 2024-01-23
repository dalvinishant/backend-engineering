## Syncronous Vs Asynchronous
	- Can I do work while waiting?

- Synchronous IO
	- Called sends a request and blocks
	- Caller cannot execute any meanhile
	- When receiver responds, caller unblocks
	- Caller and Receiver are in "sync"

- OS Synchronous I/O eg
	- Programs asks OS to read from disk
	- During I/O, program's main thread is taken off of the CPU
	- Once I/O is finished, program resumes execution

```
# Program starts execution

doSomeWork()

# Here program execution is halted for I/O
# since program exection is halted, next line which can be executed has to wait for I/O to finish

file.read("some_large_file.dat")

# program execution resumes

doSomeOtherWork()
```

- OS Asynchronous I/O eg
	- Caller sends a request and moves on
	- Caller can work until it gets a response
	- Now, caller either:
		- Check if response is ready with the server (which is also called as epoll)
		- Receiver calls back when the response is ready (io_uring)
			- io_uring makes use of Submission Queue and Completion queue
			- In order to perform I/O in batches, we push the I/O requests in batches in Submission Queue.
			- Kernel then asynchroniously processes them
			- Once I/O of a batch is finished, it gets added to Completion Queue
			- io_uring is specifically only I/O related operations only
		- Spawns another thread that does the blocking I/O which makes the main thread free and makes the I/O async indirectly
	- Caller and Receiver are not necessarily in Sync

*Note: A Kernel is a software component which sits at the very core of Operating System. A bridge between the applications and the hardware components of a System. It is responsible for orchestrating software and hardware components. Scheduling, I/O, Intrupt Handling, System Calls, Communication, Security all are taken care by kernel*

```
# Program starts execution

doSomeWork()

# Here program spawns a different thread to perform I/O
file.read("some_large_file.dat", onReadFinished(file))

# I/O does not block execution, hence the next is line executed immediately
doSomeOtherWork()

# After I/O is completed on the spawned thread above, onReadFinished method gets called (a callback function)

---> onReadFunction()
```

##  Sync Async in Request Response

- Synchronicity is a client property
	- Client decides whether to wait to continue
- Most of the modern client libraries are asynchronous
- Client sends a HTTP request and continues the work

## Asynchronous workload is everywhere

- Asynchronous Programming is everywhere (Promises etc)
- Asynchronous backend processing
	- Enqueuing the request : Backend enqueues the request and makes the client free. Client can later check the status using some promise
- Asynchronous commits in postgres
	- Suppose you have to insert something into a table
	- You do a commit to write to the table
	- DB writes it to WAL and releases the blocking commit
	- WAL (Write Ahead Logs)
		- Any change to database is written to WALs
		- changes in WALs are actually written to disk at a later point in time and then flushed
- Asynchronous IO in linux (epoll, io_uring) --> We discussed this above
- Asynchronous replication in Databases
	- Master-Slave replication in databases
- Asynchronous OS fsync(fs cache)
