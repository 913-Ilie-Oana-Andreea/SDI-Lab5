import { Location } from './Location';

export interface Concert {
    _id?: number;
    name: string,
    location_id: number,
    location?: Location,
    startTime?: Date,
    endTime?: Date,
    openGatesTime?: Date,
    ticketPrice: number,
    organizer: string
}