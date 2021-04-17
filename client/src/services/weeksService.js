import api from './api.js';
import { requester } from './requester.js';

export const create = (diaryId, number, myWeight, myBellySize, mood, babyWeight, babyHeight) => {
    const week = {
        number,
        myWeight,
        myBellySize,
        mood,
        babyWeight,
        babyHeight,
        diaryId
    };

    const url = `${api.createWeek}`;

    return requester(url, 'POST', week)
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getAllCurrentDiary = (diaryId) => {
    const url = `${api.getAllCurrentDiary}/${diaryId}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const remove = (id) => {
    const url = `${api.removeWeek}/${id}`;

    return requester(url, 'DELETE')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const getDetails = (id) => {
    const url = `${api.getWeekDetails}/${id}`;

    return requester(url, 'GET')
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const update = (id, diaryId, number, myWeight, myBellySize, mood, babyWeight, babyHeight) => {
    const week = {
        id,
        number,
        myWeight,
        myBellySize,
        mood,
        babyHeight,
        babyWeight,
        diaryId
    };

    const url = `${api.updateWeek}`;

    return requester(url, 'PUT', week)
        .then(res => res.json())
        .catch(err => console.error(err));
};