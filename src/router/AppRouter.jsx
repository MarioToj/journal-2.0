
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { FirebaseAuth } from '../auth/firebase/config';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks';
import { CheckingAuth } from '../ui/components/CheckingAuth';


export const AppRouter = () => {

  const { status } = useSelector( state => state.auth )
  const dispatch = useDispatch()

  useEffect(() => {
    
    onAuthStateChanged( FirebaseAuth, async( user ) => {

      if ( !user ) return dispatch( logout() )

      const { uid, email, displayName, photoURL } = user
      dispatch( login({ uid, email, displayName, photoURL }) )
      dispatch( startLoadingNotes() )
    } )

  }, [])
  

  if ( status === 'checking' ) {
    
    return <CheckingAuth />
  }
 
  return (
    <Routes>

      {

        status === 'Authenticated' 
        ? 
        <Route path="/*" element={ <JournalRoutes /> } />
        :
        <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      <Route path="/*" element={ <Navigate to={ '/auth/login' } /> } />
        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> } />

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> } />  */}

    </Routes>
  )
}