// jobQueue.js
class JobQueue {
    constructor() {
      this.queue = [];
      this.processing = false;
    }
  
    addJob(job) {
      this.queue.push(job);
      this.processNextJob();
    }
  
    async processNextJob() {
      if (this.processing || this.queue.length === 0) {
        return;
      }
  
      this.processing = true;
      const job = this.queue.shift();
  
      try {
        await job();
      } catch (error) {
        console.error('Error processing job:', error);
      } finally {
        this.processing = false;
        this.processNextJob();
      }
    }
  }
  
  const jobQueue = new JobQueue();
  module.exports = jobQueue;