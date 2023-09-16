import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { load, selectSettings } from '../redux/slices/settingsSlice';

export const useSettings = () => {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(load());
  }, [dispatch]);
  return {
    settings,
  };
};
