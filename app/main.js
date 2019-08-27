import CarController from "./Controllers/CarController.js";
import HouseController from "./Controllers/HouseController.js";
import JobController from "./Controllers/JobController.js";


class App {
    constructor() {
        this.controllers = {
            carCtrl: new CarController(),
            houseCtrl: new HouseController(),
            jobCtrl: new JobController()
        }
    }
}

window['app'] = new App()