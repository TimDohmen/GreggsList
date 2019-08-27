import CarController from "./Controllers/CarController.js";
import HouseController from "./Controllers/HouseController.js";


class App {
    constructor() {
        this.controllers = {
            carCtrl: new CarController(),
            houseCtrl: new HouseController()
        }
    }
}

window['app'] = new App()