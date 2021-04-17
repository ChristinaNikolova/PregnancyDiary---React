import api from './api.js';
import { requester } from './requester.js';

export const create = (positiveTest, dueDate, gender) => {
    const diary = {
        positiveTest,
        dueDate,
        gender
    };

    const url = `${api.createDiary}`;

    return requester(url, 'POST', diary)
        .then(res => res.json())
        .catch(err => console.error(err));
}
