import {useTranslation} from 'react-i18next';
import DefaultButton from '../../components/buttons/DefaultButton';
import ConfirmModal from '../../components/modals/ConfirmModal';
import {useState} from 'react';

const ConfirmModalTest = () => {
  const {t} = useTranslation();
  const [isOpenPrimary, setIsOpenPrimary] = useState(false);
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenDanger, setIsOpenDanger] = useState(false);
  const onSubmit = () => {
    console.log('Xác nhận thành công');
  };

  return (
    <>
      <DefaultButton
        rightIcon="help"
        onPress={() => setIsOpenPrimary(true)}
        title={t('button.confirm')}
        type="primary"
        mode="contained"
        style={{
          margin: 20,
        }}
      />
      <ConfirmModal
        isOpen={isOpenPrimary}
        setIsOpen={setIsOpenPrimary}
        title="Xác nhận"
        message="Bạn chắc chắn muốn xác nhận không?"
        onSubmit={onSubmit}
      />
      <DefaultButton
        leftIcon="alert-outline"
        onPress={() => setIsOpenWarning(true)}
        title={t('button.confirm')}
        type="warning"
        mode="contained"
        style={{
          margin: 20,
        }}
      />
      <ConfirmModal
        isOpen={isOpenWarning}
        setIsOpen={setIsOpenWarning}
        type="warning"
        title="Xác nhận"
        message="Bạn chắc chắn muốn xác nhận không?"
        onSubmit={onSubmit}
      />
      <DefaultButton
        leftIcon="check"
        onPress={() => setIsOpenSuccess(true)}
        title={t('button.confirm')}
        type="success"
        mode="contained"
        style={{
          margin: 20,
        }}
      />
      <ConfirmModal
        isOpen={isOpenSuccess}
        setIsOpen={setIsOpenSuccess}
        title="Xác nhận"
        type="success"
        message="Bạn chắc chắn muốn xác nhận không?"
        onSubmit={onSubmit}
      />
      <DefaultButton
        rightIcon="close"
        onPress={() => setIsOpenDanger(true)}
        title={t('button.confirm')}
        type="danger"
        mode="contained"
        style={{
          margin: 20,
        }}
      />
      <ConfirmModal
        isOpen={isOpenDanger}
        setIsOpen={setIsOpenDanger}
        type="danger"
        title="Xác nhận"
        message="Bạn chắc chắn muốn xác nhận không?"
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ConfirmModalTest;
