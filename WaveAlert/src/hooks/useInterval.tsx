import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Recordar la última función callback proporcionada
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Establecer el intervalo
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);

      // Limpiar el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

export default useInterval;