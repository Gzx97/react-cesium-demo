import dayjs from 'dayjs';

export const formatDate = (date?: number | undefined) => {
    if (date) {
        return dayjs(date).format('YYYY-MM-DD');
    }
};

export const formatDateTime = (date?: number | undefined) => {
    if (date) {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    }
};

export const format = (date: number, format: string) => {
    if (date) {
        return dayjs(date).format(format);
    }
};
