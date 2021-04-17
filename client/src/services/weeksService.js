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
}