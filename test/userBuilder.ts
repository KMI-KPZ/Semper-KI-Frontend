import { Address, User,UserType } from "../src/hooks/useUser/types";

export class UserBuilder {
    email:string = "test@test.de";
    name:string = "test";
    organization:string = "";
    type:UserType = 0;
    hashedID:string= ""
    address:Address= {
        city: "test",
        country: "germany",
        houseNumber: "1",
        street: "teststreet",
        zipcode: "12345",
    }
    created:Date= new Date()
    updated:Date= new Date()
    accessed:Date= new Date()

    withType(type:UserType):UserBuilder {
        this.type = type;
        return this;
    }
 
    build():User {
        return({
            email: this.email,
            name: this.name,
            organization: this.organization,
            type: this.type,
            hashedID: this.hashedID,
            address: this.address,
            created: this.created,
            updated: this.updated,
            accessed: this.accessed
        })   
    }
}