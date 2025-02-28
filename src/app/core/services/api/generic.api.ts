import { Observable } from "rxjs";
import { IGenericApi } from "./interfaces/generic.api.interface";
import { HttpClient } from "@angular/common/http";

export abstract class GenericApi<T> implements IGenericApi<T>
{
    abstract apiUrl: string;
    constructor(private http: HttpClient)
    {}
    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl);
    }
    add(object: T): Observable<T> {
        return this.http.post<T>(this.apiUrl,object);
    }
    update(object: T): Observable<void> {
        return this.http.put<void>(this.apiUrl,object);
    }
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}