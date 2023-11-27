import { faker } from '@faker-js/faker';

export const newData = (index) => {
    return {
        id: index + 1,
        name: faker.person.fullName(),
        age: faker.number.int(40),
        gender: faker.person.gender(),
        city: faker.person.jobArea()
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