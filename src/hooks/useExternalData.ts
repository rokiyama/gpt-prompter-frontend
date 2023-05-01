import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { loadExternalData } from '../redux/slices/externalDataSlice';

export const useExternalData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadExternalData());
  }, [dispatch]);
};
