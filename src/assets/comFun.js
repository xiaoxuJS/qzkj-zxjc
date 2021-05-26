

export const isEmpty = (obj) => {
    if (typeof obj === 'undefined' || obj === null || obj === '') {
        return true;
    } else {
        return false;
    }
}

export const preProcessData = (formData) => {
    /* 删除空值 */
    Object.keys(formData).forEach(item => {
        if (isEmpty(formData[item])) {
            delete formData[item];
        }
    })
    return formData;
}