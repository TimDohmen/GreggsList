import HouseService from "../Services/HouseService.js";

let _houseService = new HouseService()

function _draw() {
  let homes = _houseService.Homes
  let template = ''
  homes.forEach(h => template += h.Template)
  document.getElementById('house-cards').innerHTML = template
}

export default class HouseController {
  constructor() {
    //NOTE Register all subscribers
    _houseService.addSubscriber('homes', _draw)

    //NOTE Retrieve data
    _houseService.getApiHouse();
  }

  addHouse(e) {
    e.preventDefault();
    let form = e.target
    let data = {
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      imgUrl: form.imgUrl.value,
      levels: form.levels.value,
      year: form.year.value,
      price: form.price.value,
      description: form.description.value,
    }
    _houseService.addHouse(data)
    form.reset()
  }

  deleteHome(id) {
    if (window.confirm('Really wanna remove the house?')) {
      _houseService.deleteHome(id)
    }
  }


}