import JobService from "../Services/JobService.js";

let _jobService = new JobService()

function _draw() {
  let jobs = _jobService.Jobs
  let template = ''
  jobs.forEach(j => template += j.Template)
  document.getElementById('job-cards').innerHTML = template
}

export default class JobController {
  constructor() {
    _jobService.addSubscriber('jobs', _draw)

    //NOTE Retrieve data
    _jobService.getApiJobs();
  }
  addJob(e) {
    e.preventDefault()
    let form = e.target
    let data = {
      company: form.company.value,
      jobTitle: form.jobTitle.value,
      hours: form.hours.value,
      rate: form.rate.value,
      description: form.description.value,
    }
    _jobService.addJob(data)
    form.reset()
  }
  deleteJob(id) {
    if (window.confirm('You really wanna delete this job')) {
      _jobService.deleteJob(id)
    }
  }

}