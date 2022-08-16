import {  DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useRef } from "react"
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNotes, startUploadingFiles } from "../../store/journal/thunks"
import { ImagenesGallery } from "../componentes"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

export const Noteview = () => {

    const inputFileRef = useRef()

    const dispatch = useDispatch()

    const { active:activenote, messageSaved, isSaving } = useSelector( state => state.journal )

    const { body, title, date, onInputChange, formState } = useForm( activenote )

    const dateString = useMemo(() => {

        const newDate = new Date( date )

        return newDate.toUTCString()
    }, [date])

    useEffect(() => {

        dispatch( setActiveNote(formState) )
    }, [formState])

    useEffect(() => {

        if ( messageSaved.length > 0 ) {
            Swal.fire( 'Nota Actualizada', messageSaved, 'success' )
        }
    }, [messageSaved])


    const onSaveNote = () => {

        dispatch( startSaveNotes() )
    }

    const onFileInputChange = ({ target }) => {

        if ( target.length === 0 ) return; 

        dispatch( startUploadingFiles( target.files ) )
    }

    const onClickDelete = () => {

        dispatch( startDeletingNote(activenote.id) )
    }

  return (
    <Grid 
    container 
    direction='row' 
    justifyContent='space-between' 
    alignItems='center' sx={{ mb: 1 }} 
    className='animate__animated fadeIn animate__faster'>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
        </Grid>
        <Grid item>

            <input
            type='file'
            multiple
            onChange={ onFileInputChange }
            style={{ display: 'none' }}
            ref={ inputFileRef }/>

            <IconButton
            onClick={ () => inputFileRef.current.click() }
            color='primary'
            disabled={ isSaving }>
                <UploadOutlined />
            </IconButton>

            <Button
            color='primary' 
            sx={ {padding: 2} }
            onClick={ onSaveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid> 
        <Grid container > 
            <TextField type='text'
            variant='filled'
            fullWidth placeholder="Ingrese titulo"
            sx={{ border: 'none', mb: 1 }}
            name='title'
            value={ title }
            onChange={ onInputChange } >
            </TextField>
        </Grid>
        <Grid container > 
            <TextField type='text'
            variant='filled'
            fullWidth placeholder="¿Qué sucedió hoy?"
            multiline
            minRows={5}
            name='body'
            value={ body }
            onChange={ onInputChange } >
            </TextField>
        </Grid>

        <Grid container justifyContent='end'>
            <Button
            onClick={onClickDelete}
            sx={ { mt: 2 } }
            color='error'>
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        <ImagenesGallery images={ activenote.imageUrls } />
    </Grid>
  )
}
