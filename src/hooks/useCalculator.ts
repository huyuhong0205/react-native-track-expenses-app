/* React */
import { useCallback, useReducer } from 'react';

/* Utils */
import { evaluate } from '../utils/evaluate';

/* //////////////////////////////////////////////////////////////// */
const initialState = {
  prevOperand: '0',
  currentOperand: '0',
  operation: '',
};

const reducer = (
  state: typeof initialState,
  { type, payload }: Action
): typeof initialState => {
  switch (type) {
    case 'ADD_DIGIT':
      if (payload.digit === 0 && state.currentOperand === '0') return state;
      if (
        payload.digit === '.' &&
        (state.currentOperand === '0' || state.currentOperand.includes('.'))
      )
        return state;

      return {
        ...state,
        currentOperand: `${
          state.currentOperand === '0' ? '' : state.currentOperand
        }${payload.digit}`,
      };

    case 'CHOOSE_OPERATION':
      if (state.currentOperand === '0' && state.prevOperand === '0')
        return state;

      if (state.prevOperand === '0')
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: '0',
        };

      if (state.currentOperand === '0')
        return {
          ...state,
          operation: payload.operation,
        };

      return {
        ...state,
        prevOperand: evaluate(
          state.prevOperand,
          state.currentOperand,
          state.operation
        ),
        currentOperand: '0',
        operation: payload.operation,
      };

    case 'CLEAR':
      return { ...state, prevOperand: '0', currentOperand: '0', operation: '' };

    case 'DELETE_DIGIT':
      return {
        ...state,
        currentOperand:
          state.currentOperand.length === 1
            ? '0'
            : state.currentOperand.slice(0, -1),
      };

    default:
      return state;
  }
};

export default function useCalculator() {
  const [{ prevOperand, currentOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const addDigit0 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 0 } });
  }, []);
  const addDigit1 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 1 } });
  }, []);
  const addDigit2 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 2 } });
  }, []);
  const addDigit3 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 3 } });
  }, []);
  const addDigit4 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 4 } });
  }, []);
  const addDigit5 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 5 } });
  }, []);
  const addDigit6 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 6 } });
  }, []);
  const addDigit7 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 7 } });
  }, []);
  const addDigit8 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 8 } });
  }, []);
  const addDigit9 = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: 9 } });
  }, []);
  const addDigitDot = useCallback(() => {
    dispatch({ type: 'ADD_DIGIT', payload: { digit: '.' } });
  }, []);

  const chooseOperationDivide = useCallback(() => {
    dispatch({ type: 'CHOOSE_OPERATION', payload: { operation: '/' } });
  }, []);
  const chooseOperationMultiple = useCallback(() => {
    dispatch({ type: 'CHOOSE_OPERATION', payload: { operation: '*' } });
  }, []);
  const chooseOperationMinus = useCallback(() => {
    dispatch({ type: 'CHOOSE_OPERATION', payload: { operation: '-' } });
  }, []);
  const chooseOperationPlus = useCallback(() => {
    dispatch({ type: 'CHOOSE_OPERATION', payload: { operation: '+' } });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const deleteDigit = useCallback(() => {
    dispatch({ type: 'DELETE_DIGIT' });
  }, []);

  return {
    prevOperand,
    currentOperand,
    operation,
    addDigit0,
    addDigit1,
    addDigit2,
    addDigit3,
    addDigit4,
    addDigit5,
    addDigit6,
    addDigit7,
    addDigit8,
    addDigit9,
    addDigitDot,
    chooseOperationDivide,
    chooseOperationMultiple,
    chooseOperationMinus,
    chooseOperationPlus,
    clear,
    deleteDigit,
  };
}

type Action =
  | {
      type: 'ADD_DIGIT';
      payload: {
        digit: number | string;
      };
    }
  | {
      type: 'CHOOSE_OPERATION';
      payload: {
        operation: string;
      };
    }
  | {
      type: 'CLEAR';
      payload?: undefined;
    }
  | {
      type: 'DELETE_DIGIT';
      payload?: undefined;
    };
