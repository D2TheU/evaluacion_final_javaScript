// Objeto Calculadora
var Calculator = {
    num1: "0",
    num2: "",
    num3: "",
    operator: "",
    redo: "",
    firstShown: true,
    init: function() {
        var obj = this;
        // Obtener teclas de calculadora
        var keys = document.getElementsByClassName('tecla');
        // Definir función para mouse down que escale el elemento a 95%
        var mouseDownFunc = function() {
            this.style.transform = "scale(0.95)";
        }
        // Definir función para mouse up que escale el elemento al 100%
        var mouseUpFunc = function() {
            this.style.transform = "scale(1)";
        }
        // Recorrer cada tecla para asignar el listener de mousedown, mouseup y clic
        for (var i = 0; i < keys.length; i++) {
            keys[i].addEventListener('mousedown', mouseDownFunc);
            keys[i].addEventListener('mouseup', mouseUpFunc);
            keys[i].addEventListener('click', function() {
                var id = this.id;
                switch (id) {
                    case "on":
                        obj.reset();
                        break;
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        obj.number(id);
                        break;
                    case "punto":
                        obj.point();
                        break;
                    case "mas":
                    case "menos":
                    case "por":
                    case "dividido":
                        obj.operation(id);
                        break;
                    case "raiz":
                        obj.root();
                        break;
                    case "sign":
                        obj.sign();
                        break;
                    case "igual":
                        obj.equals();
                        break;

                }
            });
        }
    },
    reset: function() {
        if (this.num1 != "0") {
            this.num3 = this.num1;
            this.num1 = "0";
        } else {
            this.num1 = "0";
            this.num2 = "";
            this.num3 = "";
            this.operator = "";
            this.redo = "";
        }
        this.printValue(this.num1);
    },
    operation: function(op) {
        if (this.operator != "") {
            this.num1 = this.calculate(this.operator);
        }
        this.operator = op;
        this.num2 = "";
        this.printValue("");
        this.firstShown = false;
    },
    root: function() {
        console.log("Here would be the root");
    },
    sign: function() {
        var tempNum = this.firstShown ? this.num1 : this.num2;
        if (tempNum != "0") {
            if (tempNum.indexOf('-') == -1) {
                tempNum = "-" + tempNum;
            } else {
                tempNum = tempNum.substring(1);
            }
            this.printValue(tempNum);
            if (this.firstShown) {
                this.num1 = tempNum;
            } else {
                this.num2 = tempNum;
            }
        }
    },
    number: function(num) {
        var firstNum = this.operator == "";
        var tempNum = firstNum ? this.num1 : this.num2;
        if (tempNum == "0") {
            tempNum = num;
        } else if (tempNum.length < 8) {
            tempNum += num;
        }
        if (firstNum) {
            this.num1 = tempNum;
            this.firstShown = true;
        } else {
            this.num2 = tempNum;
            this.firstShown = false;
        }
        this.printValue(tempNum);
    },
    point: function() {
        var tempNum = this.firstShown ? this.num1 : this.num2;
        if (tempNum.indexOf('.') == -1) {
            tempNum += ".";
        }
        if (tempNum.length == 1) {
            tempNum = "0" + tempNum;
        }
        this.printValue(tempNum);
        if (this.firstShown) {
            this.num1 = tempNum;
        } else {
            this.num2 = tempNum;
        }
    },
    equals: function() {
        var op = this.operator != "" ? this.operator : this.redo;
        this.num1 = this.calculate(op);
        this.printValue(this.num1);
        this.firstShown = true;
        this.redo = this.operator != "" ? this.operator : this.redo;
        this.num3 = this.num2 != "" ? this.num2 : this.num3;
        this.operator = "";
        this.num2 = "";

    },
    printValue: function(val) {
        // console.log("So far: " + this.num1 + " " + this.operator + " " + this.num2);
        // console.log("Redo: " + this.redo + " " + this.num3);
        // console.log();
        // console.log("Valor a printValue: " + val);
        // console.log("Num1:\t" + this.num1 + "\t\t\tOperator: " + this.operator);
        // console.log("Num2:\t" + this.num2 + "\t\t\tRedo:     " + this.redo);
        // console.log("Num3:\t" + this.num3);
        document.getElementById('display').innerHTML = val;
    },
    calculate: function(op) {
        var n1 = this.getValue(1)
        var n2 = this.getValue(2)
        var result = 0;
        switch (op) {
            case "mas":
                result = n1 + n2;
                break;
            case "menos":
                result = n1 - n2;
                break;
            case "dividido":
                result = n1 / n2;
                break;
            case "por":
                result = n1 * n2;
                break;
        }
        // var index1 = n1.toString().indexOf('.');
        // var round1 = index1 != -1 ? n1.toString().length : 0;
        // var index2 = n2.toString().indexOf('.');
        // var round2 = index2 != -1 ? n2.toString().length : 0;
        // if (round1 != 0 || round2 != 0) {
        //     result = round1 > round2 ? result.toPrecision(round1) : result.toPrecision(round2);
        // }
        return this.trim(result);
    },
    getValue: function(option) {
        if (option == 1) {
            return parseFloat(this.num1);
        } else if (this.num2 != "") {
            return parseFloat(this.num2);
        } else if (this.num3 != "") {
            return parseFloat(this.num3);
        } else {
            return parseFloat(this.num1);
        }
    },
    trim: function(result) {
        result = result.toString();
        result = result.substring(0, 8);
        result = parseFloat(result);
        return result.toString();
    }
}

Calculator.init();
