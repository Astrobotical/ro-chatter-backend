// src/jobProcessor.ts
import { Job } from '../entities/Job';
import { AppData } from '../server';

const processJob = async (job: Job) => {
  try {
    // Simulate job processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    job.status = 'completed';
    job.processedAt = new Date();
    await AppData.getRepository(Job).save(job);
    console.log(`Job ${job.id} processed`);
  } catch (error) {
    job.status = 'failed';
    await AppData.getRepository(Job).save(job);
    console.error('Error processing job:', error);
  }
};

export const startJobProcessor = async () => {
  const jobRepository =  AppData.getRepository(Job);

  while (true) {
    const job = await jobRepository.findOne({ where: { status: 'pending' } });
    if (job) {
      job.status = 'processing';
      await jobRepository.save(job);
      await processJob(job);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before checking again
    }
  }
};