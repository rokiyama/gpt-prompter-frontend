import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { loadSystemMessages } from '../redux/slices/externalDataSlice';

type Props = {
  children: ReactNode;
};

export const SystemMessagesLoader = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadSystemMessages());
  }, [dispatch]);
  return <>{children}</>;
};
