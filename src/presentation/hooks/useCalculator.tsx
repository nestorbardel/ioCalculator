import {useEffect, useRef, useState} from 'react';

enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '÷',
}

export const useCalculator = () => {
    const [formula, setFormula] = useState<string>('');
    const [number, setNumber] = useState<string>('0');
    const [prevNumber, setPrevNumber] = useState<string>('0');

    const lastOperation = useRef<Operator>();


    useEffect(() => {
        if(lastOperation.current){
            const firstFormulaPart = formula.split( ' ' ).at(0);
            setFormula( `${firstFormulaPart} ${lastOperation.current} ${number}`);
        }else{
            setFormula(number);
        }
    }, [number]);

    useEffect(() => {
      const subResult = calculateSubResult();
      setPrevNumber(`${subResult}`);
    }, [formula]);


    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setFormula('');
    };

    const deleteOperation = () => {
        if(number.length === 1) {return setNumber('0');}
        setNumber(number.slice(0, -1));
    };

    const toggleSign = () => {
        if(number.includes('-')){
            return setNumber(number.replace('-',''));
        }

        setNumber('-' + number);
    };

    const buildNumber = (numberString: string): void => {
        if (number.includes('.') && numberString === '.') {return;}
        setNumber(number + numberString);

        if (number.startsWith('0') || number.startsWith('-0')) {
            //Punto Decimal
            if (numberString === '.') {
                return setNumber(numberString);
            }

            //Evaluar si es otro ceto y no hay punto
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            //Evaluar si es diferente de cero, no hay punto, y es el primer numero
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }

            //Evitar 0000000
            if (numberString === '0' && !number.includes('.')) {
                return;
            }

            return setNumber(number + numberString);
        }

        setNumber(number + numberString);
    };

    const setLastNumber = () => {
        calculateResult();
        if(number.endsWith('.')){
            setPrevNumber(number.slice(0,-1));
        } else {
            setPrevNumber(number);
        }

        setNumber('0');
    };

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    };
    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    };
    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    };
    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    };

    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula(`${result}`);

        lastOperation.current = undefined;

        setPrevNumber('0');
    };

    const calculateSubResult = (): Number => {
        const [firstValue, operation, secondValue] = formula.split( ' ' );

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if(isNaN(num2)) {return num1;}

        switch(operation){

            case Operator.add:
                return num1 + num2;

            case Operator.subtract:
                return num1 - num2;

            case Operator.multiply:
                return num1 * num2;

            case Operator.divide:
                return num1 / num2;


            default:
                throw new Error('Operation not implemented');
        }
    };

    return {
        //Properties
        number,
        prevNumber,
        formula,



        //Methods
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateResult,
    };
};
