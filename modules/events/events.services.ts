import { Db, DeleteResult, Document, WithId, ModifyResult, ObjectId, InsertManyResult } from 'mongodb';
import Paginate, { IQueryResult } from '../database/paginate';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

class Event {
    db: Db;

    constructor(db: Db){
        this.db = db;
    }

    /**
     * Insert a single event
     * @param {Record<string, any>} eventBody
     * @returns {Promise<WithId<Document> | null>}
     */
    async insertEvent(eventBody: Record<string, any>): Promise<WithId<Document> | null>{
        const result = await this.db.collection('events').insertOne(eventBody);
        return await this.findById(result.insertedId);
    }

    /**
     * Delete a single event
     * @param {ObjectId} eventId
     * @returns {Promise<DeleteResult>}
     */
    async deleteEvent(eventId: ObjectId): Promise<DeleteResult>{
        const event = await this.findById(eventId);
        if(!event) throw new ApiError(httpStatus.NOT_FOUND, 'Event does not exist');
        return this.db.collection('events').deleteOne({ "_id":eventId });
    }

    /**
     * This will reset the events collection by deleting all documents. Use carefully
     * @returns {Promise<DeleteResult>}
     */
    async reset(): Promise<DeleteResult>{
        return this.db.collection('events').deleteMany({});
    }

    /**
     * Paginates events
     * @param {IPagination} paginationbody pagination filter and options
     * @returns {Promise<IQueryResult>} List of events that satisfy filter
     */
    async paginate(paginationbody: any): Promise<IQueryResult> {
        const pagination = new Paginate(paginationbody.filter, paginationbody.options, this.db.collection('events'));
        return await pagination.getDocuments();
    }

    /**
     * Find a event using an id
     * @param {ObjectId} eventId event id
     * @returns {Promise<WithId<Document> | null>} event
     */
    async findById(eventId: ObjectId): Promise<WithId<Document> | null> {
        return await this.db.collection('events').findOne({"_id":eventId});
    }

    /**
     * Updates a event
     * @param {ObjectId} eventId 
     * @param {Record<string, any>} updateBody 
     * @returns {Promise<ModifyResult<Document>>} updated document
     */
    async update(eventId: ObjectId, updateBody: Record<string, any>): Promise<ModifyResult<Document>>{
        const event = await this.findById(eventId);
        if(!event) throw new ApiError(httpStatus.NOT_FOUND, 'Event does not exist');
        return await this.db.collection('events').findOneAndUpdate({"_id":eventId}, { $set: updateBody }, { returnDocument: 'after' });
    }

    /**
     * Inserts many events
     * @param {Record<string, any>[]} events list of events
     * @returns {Promise<InsertManyResult<Document>>} 
     */
    async insertEvents(events: Record<string, any>[]): Promise<InsertManyResult<Document>>{
        return await this.db.collection('events').insertMany(events);
    }
}

export default Event;
