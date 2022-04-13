import { format } from 'date-fns';

export const formatDate = (strDate) => {
    const date = new Date(strDate);
    
    return format(new Date(date.getFullYear(),  date.getMonth(), date.getDate()), 'dd.MM.yyyy');
};