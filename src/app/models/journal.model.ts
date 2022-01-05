import { Entries } from './entries.model';

export interface Journal {
    title: string;
    id: string;
    img: string;
    entries: Array<Entries>
}