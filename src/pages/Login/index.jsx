import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { fetchAuth } from "../../redux/slices/auth";

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => Boolean(state.auth.user))
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '1111@gmail.com',
      password: '11111',
    },
    mode: 'onChange'
  });

  const onSumbit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }else{
      alert('Не удалось авторизироваться')
    }
    
  }

  if(isAuth){
    return navigate('/')
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          type = "password"
          className={styles.field}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label="Пароль"
          {...register('password', { required: "Укажите пароль" })}
          fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
