import { v6 as uuid} from "uuid";

export class Todo {

    /**
     * 
     * @param {String} description 
     */
    constructor( description ){

        if(!description) throw new Error('Falta el argumento "Description", vuelva a intentarlo!');
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }

}