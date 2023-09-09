import { Alert } from 'react-native';
import { Button } from '../../component/atoms/Button';
import { i18n } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { save, selectAuth } from '../../redux/slices/authSlice';
import { useDeleteAccount } from './useDeleteAccount';

type Props = {
  navigateToTop: () => void;
};

export const DeleteAccount = ({ navigateToTop }: Props) => {
  const dispatch = useAppDispatch();
  const { idToken } = useAppSelector(selectAuth);
  const { deleteAccount } = useDeleteAccount();

  return (
    <>
      <Button
        title={i18n.t('deleteAccount')}
        color="red"
        onPress={() =>
          Alert.alert(
            i18n.t('deleteAccountConfirmTitle'),
            i18n.t('deleteAccountConfirmBody'),
            [
              {
                text: i18n.t('cancel'),
                style: 'cancel',
              },
              {
                text: i18n.t('ok'),
                onPress: async () => {
                  try {
                    const res = await deleteAccount(idToken);
                    switch (res) {
                      case 'success':
                        Alert.alert(
                          i18n.t('deleteAccount'),
                          i18n.t('deleteAccountReserved')
                        );
                        break;
                      case 'unauthorized':
                        Alert.alert(
                          i18n.t('deleteAccount'),
                          i18n.t('deleteAccountAuthError')
                        );
                        break;
                      case 'alreadyReservedForDeletion':
                        Alert.alert(
                          i18n.t('deleteAccount'),
                          i18n.t('deleteAccountAlreadyReserved')
                        );
                    }
                    dispatch(save({ idToken: '', user: '' }));
                    navigateToTop();
                  } catch (err) {
                    console.error(err);
                    Alert.alert(
                      i18n.t('deleteAccount'),
                      i18n.t('errorOccurred')
                    );
                  }
                },
              },
            ]
          )
        }
      />
    </>
  );
};
