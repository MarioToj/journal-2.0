import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidation = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [FormValidations, setFormValidations] = useState({})

    useEffect(() => {
      createValidators()
    
    }, [formState])

    useEffect(() => {
        setFormState( initialForm )
      
      }, [initialForm])

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys( FormValidations )) {
            if (FormValidations[formValue] !== null ) return false
        }

        return true
    }, [FormValidations])    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckValues = {}

       for (const formFields of Object.keys(formValidation)) {
         
        const [ fn, errorMessage ] = formValidation[ formFields ]

        formCheckValues[`${ formFields }Valid`] = fn( formState[ formFields ] ) ? null : errorMessage
       }

       setFormValidations( formCheckValues )
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        
        ...FormValidations,
        isFormValid
    }
}