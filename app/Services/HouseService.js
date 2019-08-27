import House from "../Models/House.js";

let _state = {
  homes: []
}
let _subscribers = {
  homes: []
}

let _houseApi = axios.create({
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/houses'

})

function _setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(fn => fn());
}

export default class HouseService {
  deleteHome(id) {
    _houseApi.delete(id)
      .then(res => {
        let index = _state.homes.findIndex(house => house._id == id)
        _state.homes.splice(index, 1)
        _setState('homes', _state.homes)
      })
  }

  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }

  get Homes() {
    return _state.homes
  }
  getApiHouse() {
    _houseApi.get()
      .then(res => {
        let houseData = res.data.data.map(h => new House(h))
        _setState('homes', houseData)
      })
  }

  addHouse(data) {
    _houseApi.post('', data)
      .then(res => {
        _state.homes.push(new House(res.data.data))
        _setState('homes', _state.homes)
      })
  }

}