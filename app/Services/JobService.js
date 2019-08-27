import Job from "../Models/Job.js";

let _jobApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/jobs'

})

let _state = {
  jobs: []
}

let _subscribers = {
  jobs: []
}

function _setState(propName, data) {
  //NOTE add the data to the state
  _state[propName] = data
  //NOTE run every subscriber function that is watching that data
  _subscribers[propName].forEach(fn => fn());
}


export default class JobService {
  deleteJob(id) {
    _jobApi.delete(id)
      .then(res => {
        let index = _state.jobs.findIndex(job => job._id == id)
        _state.jobs.splice(index, 1)
        _setState('jobs', _state.jobs)
      })
  }
  addJob(data) {
    _jobApi.post('', data)
      .then(res => {
        _state.jobs.push(new Job(res.data.data))
        _setState('jobs', _state.jobs)
      })
  }
  //NOTE adds the subscriber function to the array based on the property it is watching
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Jobs() {
    return _state.jobs
  }

  getApiJobs() {
    _jobApi.get()
      .then(res => {
        let jobsData = res.data.data.map(j => new Job(j))
        _setState('jobs', jobsData)
      })
  }



}