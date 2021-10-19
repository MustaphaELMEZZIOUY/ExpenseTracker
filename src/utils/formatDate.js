const formatDate = (date) => {
    const d = new Date(date);
    const day = `${d.getDay()}`;
    const month = `${d.getMonth()}`;
    const year = `${d.getFullYear()}`;

    return [year, format(month), format(day)].join('-');
}

const format = (input) => {
    if(input.length < 2) {
        return `0${input}`;
    }

    return input;
}

export default formatDate;