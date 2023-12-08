import { faker } from '@faker-js/faker';

const dateFormat = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDay() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export const newData = (index) => {
    return {
        id: index + 1,
        name: faker.person.fullName(),
        age: faker.number.int(40).toString(),
        gender: index % 3 === 0 ? '남자' : '여자',
        createdAt: dateFormat(faker.date.birthdate()),
        auth: index % 5 === 0 ? 'Y' : 'N',
        rowType: 'normal'
    }
};

const range = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
};

export const makeData = (arr) => {
    const makeDataLevel = (dept = 0) => {
        const length = arr[dept];
        return range(length).map(d => {
            return { ...newData(d) };
        });
    }

    return makeDataLevel()
};

const data = makeData([1000]);

export const fetchData = async (start, fetchSize) => {
    const dbData = [...data];

    return {
        data: dbData.slice(start, start + fetchSize),
        meta: {
            totalRowCount: dbData.length,
        }
    }
};