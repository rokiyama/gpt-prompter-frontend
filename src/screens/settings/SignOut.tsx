import { Button } from '../../component/atoms/Button';
import { useAppDispatch } from '../../redux/hooks';
import { save } from '../../redux/slices/authSlice';

type Props = {
  navigateToTop: () => void;
};

export const SignOut = ({ navigateToTop }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        title="Sign out"
        onPress={() => {
          dispatch(save({ idToken: '', user: '' }));
          navigateToTop();
        }}
      />
    </>
  );
};
