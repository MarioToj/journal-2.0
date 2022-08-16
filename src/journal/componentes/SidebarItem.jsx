import { TurnedInNot } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemText, ListItemIcon, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SidebarItem = ({ title,body, id, date, imageUrls  =[] }) => {

  const dispatch = useDispatch() 

  const onclickNote = () => {

    dispatch( setActiveNote({ title,body, id, date, imageUrls  }) )
  }

  return (
    <ListItem disablePadding>
        <ListItemButton
        onClick={ onclickNote }>
        <ListItemIcon>
            <TurnedInNot />
            </ListItemIcon>
        <Grid container>
            <ListItemText primary={ title } />
            <ListItemText secondary={ body } />
        </Grid>
        </ListItemButton>
    </ListItem>
  )
}
