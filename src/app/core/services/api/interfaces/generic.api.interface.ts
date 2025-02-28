import { Observable } from "rxjs";

export interface IGenericApi<T>{
    getAll() : Observable<T[]>;
    add(object: T) : Observable<T>;
    update(object: T) : Observable<void>;
    delete(id: number) : Observable<void>;
}