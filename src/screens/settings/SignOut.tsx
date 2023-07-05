import { Button } from '../../component/atoms/Button';
import { i18n } from '../../i18n';
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
        title={i18n.t('signOut')}
        onPress={() => {
          dispatch(save({ idToken: '', user: '' }));
          navigateToTop();
        }}
      />
    </>
  );
};
