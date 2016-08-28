/**
 * Created by lenovo on 2016/8/28.
 */

// 简单工厂模式
console.log('####################################################');
console.log('简单工厂模式');

var SimpleFactory = function () {

    var LoginAlert = function (text) {
        this.content = text;
    };
    LoginAlert.prototype.show = function () {
        // 显示警示框
    };

    var LoginConfirm = function (text) {
        this.content = text;
    };
    LoginConfirm.prototype.show = function () {
        // 显示确认框
    };

    var LoginPrompt = function (text) {
        this.content = text;
    };
    LoginPrompt.prototype.show = function () {
        // 显示提示框
    };

    // 简单工厂类
    // 该方法是通过类实例化对象创建的
    // 如果这些类继承同一个父类，则其父类的原型是可以共用的
    var PopFactory = function (name) {
        switch (name) {
            case 'alert':
                return new LoginAlert();
            case 'confirm':
                return new LoginConfirm();
            case 'prompt':
                return new LoginPrompt();
        }
    };

    // 提取出共同部分
    // 该方法——寄生方式创建的对象都是一个新的个体，他们的方法不能共用。
    var createPop = function (type, text) {
        // 创建一个对象，并对对象拓展属性和方法
        var o = new Object();
        o.content = text;
        o.show = function () {
            // 显示方法
        };
        if (type === 'alert') {
            // 警示框差异部分
        }
        if (type === 'confirm') {
            // 确认框差异部分
        }
        if (type === 'prompt') {
            // 提示框差异部分
        }
        // 将对象返回
        return o;
    };

    // 创建警示框
    var useNameAlert = createPop('alert', '用户名只能是字母和数字');

}();

// 工厂方法模式
console.log('####################################################');
console.log('工厂方法模式');

var FactoryMethod = function () {

    // 安全模式创建的工厂类
    var Factory = function (type, content) {
        if (this instanceof Factory) {
            var s = new this[type](content);
            return s;
        } else {
            return new Factory(type, content);
        }
    };
    // 工厂原型中设置创建所有类型数据对象的基类
    Factory.prototype = {
        Java : function (content) {
            // ......
        },
        JavaScript : function (content) {
            // ......
        },
        UI : function (content) {
            this.content = content;
            (function (content) {
                var div = document.createElement('div');
                div.innerHTML = content;
                div.style.border = '1px solid red';
                document.getElementById('container').appendChild(div);
            })(content);
        },
        php : function (content) {
            // ......
        }
    };

}();

// 抽象工厂模式
console.log('####################################################');
console.log('抽象工厂模式');

var AbstractFactory = function () {

    var VehicleFactory = function (subType, superType) {
        // 判断抽象工厂中是否有该抽象类
        if (typeof VehicleFactory[superType] === 'function') {
            // 缓存类
            function F () {}
            // 继承父类属性和方法
            F.prototype = new VehicleFactory[superType]();
            // 将子类constructor指向子类
            subType.constructor = subType;
            // 子类原型继承“父类”
            subType.prototype = new F();
        } else {
            // 不存在该抽象类
            throw new Error('未创建该抽象类');
        }
    };

    // 小汽车抽象类
    VehicleFactory.Car = function () {
        this.type = 'Car';
    };
    VehicleFactory.Car.prototype = {
        getPrice : function () {
            return new Error('抽象方法不能调用');
        },
        getSpeed : function () {
            return new Error('抽象方法不能调用');
        }
    };
    // 公共汽车抽象类
    VehicleFactory.Bus = function () {
        this.type = 'Bus';
    };
    VehicleFactory.Bus.prototype = {
        getPrice : function () {
            return new Error('抽象方法不能调用');
        },
        getPassengerNum : function () {
            return new Error('抽象方法不能调用');
        }
    };
    // 火车抽象类
    VehicleFactory.Truck = function () {
        this.type = 'Truck';
    };
    VehicleFactory.Truck.prototype = {
        getPrice : function () {
            return new Error('抽象方法不能调用');
        },
        getTrainload : function () {
            return new Error('抽象方法不能调用');
        }
    };

    // 宝马汽车子类
    var BMW = function (price, speed) {
        this.price = price;
        this.speed = speed;
    };
    // 抽象工厂实现对Car抽象类的继承
    VehicleFactory(BMW, 'Car');
    BMW.prototype.getPrice = function () {
        return this.price;
    };
    BMW.prototype.getSpeed = function () {
        return this.speed;
    };

    // 宇通汽车子类
    var YUTONG = function (price, passenger) {
        this.price = price;
        this.passenger = passenger;
    };
    // 抽象工厂实现对Bus抽象类的继承
    VehicleFactory(YUTONG, 'Bus');
    YUTONG.prototype.getPrice = function () {
        return this.price;
    };
    YUTONG.prototype.getPassengerNum = function () {
        return this.passenger;
    };

    // 奔驰汽车子类
    var BenzTruck = function (price, trainLoad) {
        this.price = price;
        this.trainLoad = trainLoad;
    };
    // 抽象工厂实现对Truck抽象类的继承
    VehicleFactory(BenzTruck, 'Truck');
    BenzTruck.prototype.getPrice = function () {
        return this.price;
    };
    BenzTruck.prototype.getTrainload = function () {
        return this.trainLoad;
    };

    var truck = new BenzTruck(1000000, 1000);
    console.log(truck.getPrice());
    console.log(truck.getTrainload());

}();
