import React, {useReducer} from 'react';
//generate a random id
import {v4 as uuid} from "uuid"; 
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import{
    ADD_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    DELETE_CONTACT
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts : [
            {
                id : 1,
                name :'melinda gate',
                email :'melinda@gmail.com',
                phone :'111-111-111',
                type: 'personal'
            },
            {
                id : 2,
                name :'elinda gate',
                email :'elinda@gmail.com',
                phone :'11-111-111',
                type: 'professional'
            },
        ],
        current : null,
        filtered : null
    };
    //State Allows to access anything in out state and dispatch allows us to dispatch objects to the reducer. 
    const [state,dispatch] = useReducer(contactReducer,initialState);

    //Add Contact
    const addContact = contact => {
        contact.id = uuid();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    };
    //Delete Contact 
    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    };
    //Set Current Contact 
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    };
    //Clear Contact 
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    };
    //Update Contact 
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        });
    };
    //Filter Contacts 
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    };
    //Clear Filter 
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    };
    return (
        <ContactContext.Provider
         value = {{
             contacts: state.contacts,
             current: state.current,
             filtered: state.filtered,
             addContact,
             deleteContact,
             setCurrent,
             clearCurrent,
             updateContact,
             filterContacts,
             clearFilter
         }}>
         {props.children}
        </ContactContext.Provider> 
    );
};

export default ContactState;