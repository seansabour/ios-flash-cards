import { AsyncStorage } from 'react-native';
import * as api from '../utils/helpers';

export const RECEIVED_DECKS = 'RECEIVED_DECKS';
export const SAVE_NEW_DECK_FAILED = 'SAVE_NEW_DECK_FAILED';
export const HIDE_ALERTS = 'HIDE_ALERTS';
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const INVALID_TITLE_NOTIFICATION = 'INVALID_TITLE_NOTIFICATION';
export const INVALID_CARD = 'INVALID_CARD';
export const ADDED_CARD_SUCCESS = 'ADDED_CARD_SUCCESS';
export const CLEAR_DECKS = 'CLEAR_DECKS';

const receivedDecks = decks => ({
    type: RECEIVED_DECKS,
    decks
});

const failedToSaveDeck = err => ({
    type: SAVE_NEW_DECK_FAILED,
    error: err
});

const addedDeckSuccess = () => ({
    type: ADD_DECK_SUCCESS,
    notification: {
        color: 'green',
        message: 'Successfully added a deck!'
    }
});

const hideAlerts = () => ({
    type: HIDE_ALERTS,
    notification: {
        color: 'black',
        message: ''
    }
});

export const invalidTitleNotification = () => ({
    type: INVALID_TITLE_NOTIFICATION,
    notification: {
        message: 'Please enter a deck title!',
        color: 'red'
    }
});

export const invalidCard = () => ({
    type: INVALID_CARD,
    notification: {
        message: 'Please enter a question and answer!',
        color: 'red'
    }
});
const cardSuccessllyAdded = () => ({
    type: ADDED_CARD_SUCCESS,
    notification: {
        message: 'Succesfully added a card to the deck!',
        color: 'green'
    }
});
const clearDecks = () => ({
    type: CLEAR_DECKS
});
export const getDecks = () => dispatch =>
    api.getDecks().then(results => {
        dispatch(receivedDecks(JSON.parse(results)));
    });

export const addCardToDeck = (title, card) => dispatch =>
    api.addCardToDeck(title, card).then(updatedDeck => {
        dispatch(receivedDecks(JSON.parse(updatedDeck)));
        dispatch(cardSuccessllyAdded());
    });

export const removeAllDecks = () => dispatch =>
    api.removeAllDecks().then(async result => {
        dispatch(receivedDecks(result));
    });

export const saveDeckTitle = title => async dispatch => {
    api
        .saveDeckTitle(title)
        .then(
            updatedDeck => {
                dispatch(addedDeckSuccess());
                dispatch(receivedDecks(JSON.parse(updatedDeck)));
                setTimeout(() => {
                    dispatch(hideAlerts());
                }, 3000);
            },
            err => dispatch(failedToSaveDeck(err))
        )
        .catch(err => {
            throw err;
        });
};