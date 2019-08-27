import CarService from "../Services/CarService.js";

//Private
let _cs = new CarService()

function _draw() {
    let cars = _cs.Cars
    let template = ''
    cars.forEach(c => template += c.Template)
    document.getElementById('cars-cards').innerHTML = template
}

//Public
export default class CarController {
    constructor() {
        //NOTE Register all subscribers
        _cs.addSubscriber('cars', _draw)

        //NOTE Retrieve data
        _cs.getApiCars();
    }

    addCar(e) {
        e.preventDefault();
        let form = e.target
        let data = {
            make: form.make.value,
            model: form.model.value,
            imgUrl: form.imgUrl.value,
            year: form.year.value,
            price: form.price.value,
            description: form.description.value
        }
        _cs.addCar(data)
        form.reset()

    }

    delete(id) {
        if (window.confirm('Are you sure?')) {
            _cs.deleteCar(id)
        }
    }
    bid(id) {
        _cs.bid(id)
    }












}