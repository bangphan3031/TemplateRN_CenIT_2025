import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import FormModal from '../../components/modals/FormModal';
import DefaultButton from '../../components/buttons/DefaultButton';
import IconInput from '../../components/inputs/IconInput';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const FormModalTest = () => {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const schema = yup
    .object({
      username: yup
        .string()
        .required(t('message.required').replace('{0}', t('input.name'))),
      password: yup
        .string()
        .required(t('message.required').replace('{0}', t('input.password'))),
    })
    .required();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLogin = data => {
    console.log(data);
    reset();
    setIsOpen(false);
  };

  return (
    <View>
      <DefaultButton
        onPress={() => setIsOpen(true)}
        title={t('title')}
        type="primary"
        mode="contained"
        style={{
          margin: 20,
        }}
      />

      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={t('title')}
        onSubmit={handleSubmit(onLogin)}
        onDismiss={reset}>
        <>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <IconInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={t('input.name')}
                leftIcon="account"
                mode="outlined"
                errorMessage={errors.username?.message}
              />
            )}
            name="username"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <IconInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={t('input.password')}
                isPasswordInput
                leftIcon="lock"
                mode="outlined"
                errorMessage={errors.password?.message}
              />
            )}
            name="password"
            defaultValue=""
          />
        </>
      </FormModal>
    </View>
  );
};

export default FormModalTest;
