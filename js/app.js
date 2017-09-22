// Objeto Calculadora
var Calculator = {
    num1: "0", // Primer valor de operación
    num2: "", // Segundo valor de operación
    num3: "", // Valor temporal para Redo
    operator: "", // Operador que se calculará
    redo: "", // Operador en caso de que se pique igual seguido o se resetee una vez y pique igual
    firstShown: true, // Valor que determina si se muestra o no el primer valor
    resultShown: false, // Valor que determina si se está mostrando un resultado
    init: function() {
        // Obtener la Calculadora para poder hacer llamadas a sus métodos
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
                // Obtengo id para identificar botón
                var id = this.id;
                // Identificar el caso de la tecla presionada
                // Cualquier numero llama al mismo método mandando el id
                // Suma, resta, división y multiplicación llaman al mismo método mandando el id
                // Demás teclas llaman al método definido para cada una.
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
    // Función de Reset
    reset: function() {
        // Resultado ya NO se muestra
        this.resultShown = false;
        if (this.num1 != "0") {
            // Clic a ON/C, ya sea primera vez o si resultado NO es "0", reseteo parcial
            this.num3 = this.num1;
            this.num1 = "0";
        } else {
            // Segundo clic o resultado es "0", reseteo completo de variables
            this.num1 = "0";
            this.num2 = "";
            this.num3 = "";
            this.operator = "";
            this.redo = "";
        }
        // Mostrar Valor de num1 => 0
        this.printValue(this.num1);
    },
    // Función para asignar la operación que se hará: Recibe id de tecla de operación que se tecleo
    operation: function(op) {
        // Resultado ya NO se muestra
        this.resultShown = false;
        if (this.operator != "" && this.num2 != "") {
            // Se dio clic en otra operación en lugar de igual -> Ej. (((4 + 2) - 1) * 2) = 10
            // Se realiza operación previa antes de continuar
            this.num1 = this.calculate(this.operator);
        }
        // Asignar la función que se calculará, resetear num2, e imprimir vacío
        this.operator = op;
        this.num2 = "";
        this.firstShown = false;
        this.printValue("");
    },
    // Función de raíz
    root: function() {
        console.log("Aquí estaría la función para sacar raíz.");
    },
    // Función de cambiar de positivo a negativo y viceversa
    sign: function() {
        // Asignar el valor que se "muestra" -> (si NO hay valor mostrado se asigna num2 que tiene valor de "")
        var tempNum = this.firstShown ? this.num1 : this.num2;
        if (tempNum != "0" && tempNum != "") {
            // NO es ni cero, ni está vacío
            if (tempNum.indexOf('-') == -1) {
                // El número es positivo
                // Hacerlo negativo
                tempNum = "-" + tempNum;
            } else {
                // El número es negativo
                // Hacerlo positivo
                tempNum = tempNum.substring(1);
            }
            // Mostrar y reasignar el valor correspondiente
            if (this.firstShown) {
                // Se muestra el primer valor, se asigna tempNum la primer variable
                this.num1 = tempNum;
            } else {
                // NO se muestra el primer valor, se asigna tempNum a la segunda variable
                this.num2 = tempNum;
            }
            this.printValue(tempNum);
        }
    },
    // Función de número: Recibe el id del número que se tecleo (numero en string)
    number: function(num) {
        // Ver si el numero es parte del primer valor o del segundo y obtener valor correspondiente
        var firstNum = this.operator == "";
        var tempNum = firstNum ? (this.resultShown ? "0" : this.num1) : this.num2;
        // Resultado ya NO se muestra
        this.resultShown = false;
        if (tempNum == "0") {
            // El valor es 0, se suple con el número tecleado
            tempNum = num;
        } else if (tempNum.length < 8) {
            // El valor NO es 0 y es menor de 8 digitos, se agrega el número al ya mostrado
            tempNum += num;
        }
        // Mostrar y reasignar el valor correspondiente
        if (firstNum) {
            // Se asignó el primer valor, se asigna tempNum la primer variable
            this.num1 = tempNum;
            this.firstShown = true;
        } else {
            // NO se asignó el primer valor, se asigna tempNum a la segunda variable
            this.num2 = tempNum;
            this.firstShown = false;
        }
        this.printValue(tempNum);
    },
    // Función de Punto
    point: function() {
        // Asignar el valor que se "muestra" -> (si no hay valor mostrado se asigna num2 que tiene valor de "")
        var tempNum = this.firstShown ? (this.resultShown ? "0" : this.num1) : this.num2;
        // Resultado ya NO se muestra
        this.resultShown = false;
        if (tempNum.indexOf('.') == -1) {
            // El valor NO tiene un punto, se le agrega un punto
            tempNum += ".";
        }
        if (tempNum.length == 1) {
            tempNum = "0" + tempNum;
        }
        if (this.firstShown) {
            this.num1 = tempNum;
        } else {
            this.num2 = tempNum;
        }
        this.printValue(tempNum);
    },
    equals: function() {
        // Asignar operación a hacer, en caso de que operación esté vacío se asigna redo
        var op = this.operator != "" ? this.operator : this.redo;
        // Se calcula la operación y se regresa al primer valor
        this.num1 = this.calculate(op);
        // Se imprime el primer valor que es también el resultado.
        this.firstShown = true;
        this.resultShown = true;
        this.printValue(this.num1);
        // Se asigna la operación a redo, para que se pueda seguir calculando
        this.redo = this.operator != "" ? this.operator : this.redo;
        // Se asigna segundo valor de la operación a valor 3 (ya sea num2 o num3), para que se pueda seguir calculando
        this.num3 = this.num2 != "" ? this.num2 : this.num3;
        //Se vacian la operación y num2
        this.operator = "";
        this.num2 = "";

    },
    // Función para imprimir en el display de la Calculadora: recibe un valor o vacío
    printValue: function(val) {
        console.log("Num1: " + this.num1 + "\tNum2: " + this.num2 + "\tNum3: " + this.num3);
        console.log("Operator: " + this.operator + "\tRedo: " + this.redo);
        console.log("Result Shown: " + this.resultShown);
        // Se asigna el valor recibido al elemento display
        document.getElementById('display').innerHTML = val;
    },
    // Función de Calculo: recibe una operación
    calculate: function(op) {
        // Obtener primer y segundo valor para operación
        var n1 = this.getValue(1)
        var n2 = this.getValue(2)
        var result = 0;
        // Calcular la operación con los valores y operador recibido
        // En caso de que NO haya operador se regresa el primer valor
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
            default:
                result = n1;
        }
        // Regresar valor mandarlo a que se limite a 8 caracteres.
        return this.trim(result);
    },
    // Función para obtener valor 1 o valor 2: Recibe opción de valor que se pide 1 o 2
    getValue: function(option) {
        if (option == 1) {
            // Pide primer valor se regresa el valor de num1
            return parseFloat(this.num1);
        } else if (this.num2 != "") {
            // Pide segundo valor y num2 NO está vacío, se regresa num2
            return parseFloat(this.num2);
        } else if (this.num3 != "") {
            // Pide segundo valor, num2 SÍ está vacío y num3 NO está vacío, se regresa num3
            return parseFloat(this.num3);
        } else {
            // Pide segundo valor, num2 SÍ está vacío y num3 SÍ está vacío, se regresa num1
            return parseFloat(this.num1);
        }
    },
    // Función para limitar resultado a 8 caracteres: Recibe valor a procesar
    trim: function(result) {
        result = result.toString();
        result = result.substring(0, 8);
        result = parseFloat(result);
        return result.toString();
    }
}
// Inicializar Calculadora
Calculator.init();
