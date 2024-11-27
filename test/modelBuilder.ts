import { ModelLevelOfDetail, ProcessModel } from "@/api/Process/Querys/useGetProcess";



export class ModelBuilder {
    id: string ="modelID";
    title: string="modelTitle";
    tags: string[]=["Tag1"];
    date: Date = new Date;
    licenses: string[]=["MIT"];
    certificate: string[]=["ISO"];
    URI: string="https://test.test.png";
    createdBy: string="kiss";
    quantity:number = 1;
    levelOfDetail:ModelLevelOfDetail = ModelLevelOfDetail.MEDIUM;

    withId(id:string):ModelBuilder {
        this.id = id;
        return this;
    }
    withTitle(title:string):ModelBuilder {
        this.title = title;
        return this;
    }
    withTags(tags:string[]):ModelBuilder {
        this.tags = tags;
        return this;
    }
    withDate(date:Date):ModelBuilder {
        this.date = date;
        return this;
    }
    withLicense(licenses:string[]):ModelBuilder {
        this.licenses = licenses;
        return this;
    }
    withCertificate(certificate:string[]):ModelBuilder {
        this.certificate = certificate;
        return this;
    }
    withURI(URI:string):ModelBuilder {
        this.URI = URI;
        return this;
    }
    withCreatedBy(createdBy:string):ModelBuilder {
        this.createdBy = createdBy;
        return this;
    }
    withQuantity(quantity:number):ModelBuilder {
        this.quantity = quantity
        return this;
    }
    withLevelOfDetail(levelOfDetail:ModelLevelOfDetail) {
        this.levelOfDetail = levelOfDetail;
        return this;
    }

    build():ProcessModel {
        return {
            levelOfDetail:0,
            quantity:1,
            id: this.id,
            fileName: this.title,
            tags: this.tags,
            date: this.date,
            licenses: this.licenses,
            certificates: this.certificate,
            createdBy: this.createdBy,
            createdByID: "1",
            type: "Model",
            origin: "Service",
            size: 1,
            imgPath:"",
            isFile:true,
        }
    }
}