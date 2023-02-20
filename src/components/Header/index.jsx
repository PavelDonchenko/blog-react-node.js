import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { logout } from '../../redux/slices/auth';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';


export const Header = () => {
  const isAuth = useSelector((state) => Boolean(state.auth.user))
  const {user}  = useSelector((state) => state.auth)
  const firstLeter = isAuth && user.fullName.split(' ').map((el) => el[0].toUpperCase())
  const dispatch = useDispatch()
  function onClickLogout() {
    if (window.confirm('Вы уверены что хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <div className={styles.avatar}>{firstLeter}</div>

                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
