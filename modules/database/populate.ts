import { faker } from '@faker-js/faker';
import connectToDatabase from './database';
import logger from '../config/logger';

const pageTypes = ['Home', 'Product', 'Single Product', 'Add to Cart', 'Checkout', 'Confirmation', 'Contact'];
const eventTypes = ['buttonClicked', 'addToCart', 'removeFromCart', 'login', 'register', 'contact', 'search', 'comment', 'newOrder', 'payment', 'visitPage', 'exitIntent'];

/**
 * Get random integer from a given range
 * @param {number} min minimum value in range
 * @param {number} max maximum value in range
 * @returns {number} random integer from given range
 */
const getRandomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Get number of days between current date and given reference date
 * @param {number} refDate reference date in epoch format
 * @returns {number} number of days between current date and given reference date
 */
const getEpochDays = (refDate: number): number => Math.floor(((new Date().getTime()) - refDate) / (1000 * 3600 * 24));

const seed = async () => {
    logger.warn('This operation will delete all documents in your database!');

    // Db setup
    const { db } = await connectToDatabase();
    const UserCollection = db.collection('users');
    const EventCollection = db.collection('events');
    const PageCollection = db.collection('pageVisits');

    // Reset Db
    await UserCollection.deleteMany({});
    await EventCollection.deleteMany({});
    await PageCollection.deleteMany({});
    logger.info('Database has been reset: All documents are deleted');

    let userList: Record<string, any>[] = [];
    let eventList: Record<string, any>[] = [];
    let pageList: Record<string, any>[] = [];

    for (let i = 0; i < 50; i++) {
        let newUser = {
            _id: faker.datatype.uuid(),
            anonymousId: faker.datatype.uuid(),
            traits: {
                companyName: faker.company.companyName(),
                country: faker.address.country(),
                email: faker.internet.email(),
            },
            meta: {
                timestamp: faker.date.past().getTime(),
            }
        }
        userList.push(newUser);

        for (let j = 0; j < getRandomIntFromInterval(5, 50); j++) {
            let newPageVisit = {
                properties: {
                    title: pageTypes[Math.floor(Math.random() * pageTypes.length)],
                    url: faker.internet.url(),
                    path: "/",
                    hash: "",
                    search: "",
                    width: 1294,
                    height: 636
                },
                options: {},
                userId: newUser._id,
                anonymousId: newUser.anonymousId,
                meta: {
                    timestamp: faker.date.recent(getEpochDays(newUser.meta.timestamp)).getTime(),
                }
            }
            pageList.push(newPageVisit);

            for (let k = 0; k < getRandomIntFromInterval(1, 10); k++) {
                let newEvent = {
                    event: eventTypes[Math.floor(Math.random() * eventTypes.length)],
                    properties: {
                        propertyOne: faker.lorem.word(),
                        propertyTwo: faker.lorem.word(),
                    },
                    options: {},
                    userId: newUser._id,
                    email: newUser.traits.email,
                    anonymousId: newUser.anonymousId,
                    meta: {
                        "timestamp": faker.date.recent(getEpochDays(newUser.meta.timestamp)).getTime(),
                    }
                }
                eventList.push(newEvent);
            }
        }
    }

    const userSeedResult = await UserCollection.insertMany(userList);
    const eventSeedResult = await EventCollection.insertMany(eventList);
    const pageSeedResult = await PageCollection.insertMany(pageList);

    logger.info('Database seeded!');

    return Promise.all([userSeedResult, eventSeedResult, pageSeedResult]).then(values => {
        const [userResult, eventResult, pageResult] = values;
        const finalResult = {
            insertedUsers: userResult.insertedCount,
            insertedEvents: eventResult.insertedCount,
            insertedPageViews: pageResult.insertedCount,
        }
        return Promise.resolve(finalResult);
    })
};

export default seed;