import { Observable, Subject } from 'rxjs';
import { UserDetailsModel } from '../models/user-details.model';

export class UserDetailsProvider {

    private details: UserDetailsModel;
    private subjectUser = new Subject<UserDetailsModel>();

    onShare( data: UserDetailsModel ): void {
        this.subjectUser.next( data );
    }

    onReceive(): Observable<UserDetailsModel> {
        return this.subjectUser.asObservable();
    }

    onRequest() {
        return this.details;
    }

}