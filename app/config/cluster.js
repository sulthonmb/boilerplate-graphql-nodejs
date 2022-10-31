const cluster = require('cluster')
const os = require('os')

const workers = []

module.exports = async () => {
  // to read number of cores on system
  const numCores = os.cpus().length
  console.log('Master cluster setting up ' + numCores + ' workers')

  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for (let i = 0; i < numCores; i++) {
    // creating workers and pushing reference in an array
    // these references can be used to receive messages from workers
    workers.push(cluster.fork())

    // to receive messages from worker process
    workers[i].on('message', function (message) {
      console.log(message)
    })
  }

  // process is clustered on a core and process id is assigned
  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is listening')
  })

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork()
    workers.push(cluster.fork())
    // to receive messages from worker process
    workers[workers.length - 1].on('message', function (message) {
      console.log(message)
    })
  })

  console.log(`Master PID: ${process.pid}`)
}