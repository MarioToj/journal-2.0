import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {

  email:'',
  password: '',
  displayName: ''
}

const formValidation = {

    email: [ (value) => value.includes('@'), 'El correo debe de tener una @' ],
    password: [ (value) => value.length >= 6 , 'La contraseña debe de tener mas de 6 caracteres.' ],
    displayName: [ (value) => value.length >= 1, 'El nommbre es obligatorio' ]
}

export const RegisterPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );


  const isCheckingAuthtentication = useMemo( () => status === 'checking', [ status ] )

  const dispatch = useDispatch()

  const [onSubmited, setonSubmited] = useState(false)

  const { displayName, email, password, onInputChange, formState,
      displayNameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidation)

  const onSubmit = (e) => {

    e.preventDefault()
    if( !isFormValid ) return
    setonSubmited(true)

    dispatch( startCreatingUserWithEmailPassword(formState) )
  }

  return (

<AuthLayout title='Registe Login'>
  <h1>Form { isFormValid ? 'Valido' : 'No valido' }</h1>

    <form
    className='animate__animated fadeIn animate__faster'
    onSubmit={onSubmit}>
      
        <Grid container>
          <Grid item xs={ 12 } sx={{mt:2 }} >
            <TextField 
            value={displayName}
            onChange={onInputChange}
            name='displayName'
            label='Nombre Completo'
            type='text'
            placeholder='Escribe tu nombre'
            fullWidth
            error={ !!displayNameValid && onSubmited }
            helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{mt:2 }} >
            <TextField 
            value={email}
            onChange={onInputChange}
            name='email'
            label='Correo'
            type='email'
            placeholder='correo@gmail.com'
            fullWidth
            error={ !!emailValid && onSubmited }
            helperText={ emailValid }/>
          </Grid>

          <Grid item xs={ 12 } sx={{mt:2 }} >
            <TextField 
            value={password}
            onChange={onInputChange}
            name='password'
            label='Contraseña'
            type='password'
            placeholder='Contraseña'
            fullWidth
            error={ !!passwordValid && onSubmited }
            helperText={ passwordValid }/>
          </Grid>

          <Grid container spacing={ 2 } sx={ {mb: 2, mt:1} }>

          <Grid 
                  item 
                  xs={ 12 }
                  display = { !!errorMessage ? '' : 'none' }
                >
                  <Alert severity='error'>{errorMessage}</Alert>
              </Grid>

          <Grid item xs={ 12 } sm={ 12 }>

              <Button
              disabled = { isCheckingAuthtentication }
              type='submit'
              variant='contained'
              fullWidth>
               Crear cuenta
             </Button>

          </Grid>
          </Grid>

        <Grid container direction='row' justifyContent='end'>
        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
          <Link component={ RouterLink } color='inherit' to='/auth/login' >
            SingIn
          </Link>
        </Grid>

        </Grid>

      </form>

    </AuthLayout>
  )
}
