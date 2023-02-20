import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister } from "../../redux/slices/auth";

export const Registration = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => Boolean(state.auth.user))
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'Poul Poulovichchcc',
      email: '66666@gmail.com',
      password: '2222222',
    },
    mode: 'onChange'
  });

  const onSumbit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Не удалось зарегистрироваться')
    }

  }

  if (isAuth) {
    return navigate('/')
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField  
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: "Укажите полное имя" })}
        className={styles.field} 
        label="Полное имя" 
        fullWidth />
        <TextField  
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', { required: "Укажите почту" })}
        className={styles.field} 
        label="E-Mail" 
        fullWidth />
        <TextField  
        type = "password"
        minLength = '5'
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', {minLength: 5, required: "Укажите пароль" })}
        className={styles.field} 
        label="Пароль" 
        fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
