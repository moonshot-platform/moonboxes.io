import 'reflect-metadata';
import { Type } from 'class-transformer';
import { Moonbox } from './moonbox.model';

export class AdminMoonbox {
    status:    number;
    isSuccess: boolean;
    message:   string;

    @Type(() => Supply)
    data:      Supply;
}

export class Supply {
    Wood:       number;
    Gold:       number;
    Silver:     number;
    Diamond:    number;
    isUpcoming: boolean;

    get(){
        delete this['data']['isUpcoming'];

        const obj = this['data'];
        return Object.keys(obj).map( key =>
            <Moonbox>{ type: key, currentSupply: obj[key] }
        );
    }

    public hasSupply( supplyType: string ) {
        return this['supplyType'] >= 1;
    }
}