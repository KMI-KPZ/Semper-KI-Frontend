import { Address, UserProps, UserType } from "@/hooks/useUser";

export class UserBuilder {
    email:string = "test@test.de";
    name:string = "testName";
    organizations:string[] = [""];
    userType:UserType = 0;
    hashedID:string= "7ae4dc547be2fdeffc5968366925368552ba4e279725333507e9bdc60c4d955d7d1a4baea3e989e93f1dwferhjztukcbe3435975b609633343e3c70e831a5a7"
    address:Address= {
        city: "testCity",
        country: "germany",
        houseNumber: "54321",
        street: "testStreet",
        zipcode: "12345",
    }
    created:Date= new Date()
    updated:Date= new Date()
    accessed:Date= new Date()
    lastSeen:Date= new Date()
    details:any={};

    withType(type:UserType):UserBuilder {
        this.userType = type;
        return this;
    }
    withEmail(email:string):UserBuilder {
        this.email = email;
        return this;
    }
    withName(name:string):UserBuilder {
        this.name = name;
        return this;
    }
    withOrganizations(organizations:string[]):UserBuilder {
        this.organizations = organizations;
        return this;
    }
    withHashedID(hashedID:string):UserBuilder {
        this.hashedID = hashedID;
        return this;
    }
    withAddress(address:Address):UserBuilder {
        this.address = address;
        return this;
    }
    withCreated(created:Date):UserBuilder {
        this.created = created;
        return this;
    }
    withUpdated(updated:Date):UserBuilder {
        this.updated = updated;
        return this;
    }
    withAccessed(accessed:Date):UserBuilder {
        this.accessed = accessed;
        return this;
    }
    withLastSeen(lastSeen:Date):UserBuilder {
        this.lastSeen = lastSeen;
        return this;
    }
    withDetails(details:any):UserBuilder {
        this.details = details.email;
        return this;
    }



    build():UserProps {
        return({
            email: this.email,
            name: this.name,
            organizations: this.organizations,
            usertype: this.userType,
            hashedID: this.hashedID,
            created: this.created,
            updated: this.updated,
            accessed: this.accessed,
            lastSeen: this.lastSeen,
            details: this.details
        })   
    }
}