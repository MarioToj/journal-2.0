import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

import { ImagenesGallery } from '../componentes'
import { JournalLayout } from '../layout/JournalLayout'
import { Noteview } from '../views/Noteview'
import { NothingSelected } from '../views/NothingSelected'

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal )

  const dispatch = useDispatch()

  const onClickNewNote = () => {

    dispatch( startNewNote() )
  }

  return (
   <JournalLayout>

    { 
    !!active ?
    <Noteview />
    :
    <NothingSelected /> 
    }

      <IconButton
      onClick={onClickNewNote}
      disabled={ isSaving }
      size='large'
      sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        right: 50,
        bottom: 50,
        position: 'fixed'
      }}>
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

   </JournalLayout>
  )
}
