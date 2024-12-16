import {useContext, useState} from 'react';
import {CartContext} from '../../cartContextProvider/CartContext';
import {AppStackNavProp} from '../../routes/AppStack';

export const useCheckout = ({navigation}: {navigation: AppStackNavProp<'Checkout'>}) => {
  const {clear} = useContext(CartContext);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    creditcard: '',
    expire: '',
    ccv: '',
  });

  const [error, setError] = useState({
    fullName: '',
    phone: '',
    address: '',
    creditcard: '',
    expire: '',
    ccv: '',
  });

  const validate = () => {
    let isValid = true;
    const newError = {...error};

    if (!form.fullName) {
      isValid = false;
      newError.fullName = 'Full name is required';
    } else {
      newError.fullName = '';
    }

    if (!form.phone) {
      isValid = false;
      newError.phone = 'Phone number is required';
    } else {
      newError.phone = '';
    }

    if (!form.address) {
      isValid = false;
      newError.address = 'Address is required';
    } else {
      newError.address = '';
    }

    if (!form.creditcard) {
      isValid = false;
      newError.creditcard = 'Creditcard number is required';
    } else if (form.creditcard.length !== 16) {
      isValid = false;
      newError.creditcard = 'Creditcard number is invalid';
    } else {
      newError.creditcard = '';
    }

    if (!form.expire) {
      isValid = false;
      newError.expire = 'Expire is required';
    } else if (form.expire.match(/^(0[1-9]|1[0-2])\/\d{2}$/) === null) {
      isValid = false;
      newError.expire = 'Expire is invalid';
    } else {
      newError.expire = '';
    }

    if (!form.ccv || form.ccv.length !== 3) {
      isValid = false;
      newError.ccv = 'CCV is required';
    } else {
      newError.ccv = '';
    }

    setError(newError);
    return isValid;
  };

  const submit = () => {
    if (validate()) {

      console.log('Submit form', form);
      clear();
      navigation.popToTop();
    }
  };

  const onTextChange = (inputName: string, value: string) => {
    setForm({
      ...form,
      [inputName]: value,
    });
    setError({
      ...error,
      [inputName]: '',
    });
  };

  return {
    form,
    error,
    onTextChange,
    submit,
  };
};
