import { useState, useEffect } from 'react';
import useUrlStore from '@/store/url-store'; // Asegúrate de que la ruta es correcta

interface UseProgramUrlControl {
  currentUrl: string;
  ipAddress: string;
  setIpAddress: (ip: string) => void;
  saveUrl: () => void;
  clearUrl: () => void;
  isValidIp: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useUrl = (): UseProgramUrlControl => {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isValidIp, setIsValidIp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Obtener el estado actual del store
  const { programUrl, setProgramUrl, clearProgramUrl } = useUrlStore();

  // Validar la dirección IP al cambiar
  useEffect(() => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    setIsValidIp(ipRegex.test(ipAddress));
    setError(null);
  }, [ipAddress]);

  // Guardar la URL formateada
  const saveUrl = () => {
    if (!isValidIp) {
      setError('Por favor ingresa una dirección IP válida');
      return;
    }

    setIsLoading(true);
    try {
      setProgramUrl(ipAddress);
      setError(null);
    } catch (err) {
      setError('Error al guardar la URL');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Limpiar la URL
  const clearUrl = () => {
    setIpAddress('');
    clearProgramUrl();
    setError(null);
  };

  return {
    currentUrl: programUrl,
    ipAddress,
    setIpAddress,
    saveUrl,
    clearUrl,
    isValidIp,
    isLoading,
    error,
  };
};
