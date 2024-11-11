import {useState} from 'react';

export const useCalculator = () => {
    const [number, setNumber] = useState<string>('0');

    const clean = () => {
        setNumber('0');
    };

    const deleteOperation = () => {
        if(number.length === 1) return setNumber('0');
        setNumber(number.slice(0, -1));
    };

    const toggleSign = () => {
        if(number.includes('-')){
            return setNumber(number.replace('-',''));
        }

        setNumber('-' + number);
    };

    const buildNumber = (numberString: string): void => {
        if (number.includes('.') && numberString === '.') return;
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

    return {
        //Properties
        number,

        //Methods
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
    };
};
