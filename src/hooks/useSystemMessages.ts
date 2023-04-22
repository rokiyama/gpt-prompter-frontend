import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { loadSystemMessages } from '../redux/slices/externalDataSlice';

export const useSystemMessages = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadSystemMessages());
  }, [dispatch]);
};
