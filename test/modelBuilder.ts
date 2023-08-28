import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";


export class ModelBuilder {
    id: string ="modelID";
    title: string="modelTitle";
    tags: string[]=["Tag1"];
    date: string="2023-02-01";
    license: string="MIT";
    certificate: string[]=["ISO"];
    URI: string="https://test.test.png";
    createdBy: string="kiss";

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
    withDate(date:string):ModelBuilder {
        this.date = date;
        return this;
    }
    withLicense(license:string):ModelBuilder {
        this.license = license;
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
    

    build():ModelProps {
        return {
            id: this.id,
            title: this.title,
            tags: this.tags,
            date: this.date,
            license: this.license,
            certificate: this.certificate,
            URI: this.URI,
            createdBy: this.createdBy,
        }
    }
}