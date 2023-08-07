import { MaterialProps } from "@/pages/OrderRoutes/Service/Manufacturing/Material/Material";


export class MaterialBuilder {
    id: string="materialID";
    title: string="materialTitle";
    propList: string[]=["prop"];
    URI: string="https://test.test.png";

    withId(id:string):MaterialBuilder {
        this.id = id;
        return this;
    }
    withTitle(title:string):MaterialBuilder {
        this.title = title;
        return this;
    }
    withPropList(propList:string[]):MaterialBuilder {
        this.propList = propList;
        return this;
    }
    withURI(URI:string):MaterialBuilder {
        this.URI = URI;
        return this;
    }
    

    build():MaterialProps {
        return {
            id: this.id,
            title: this.title,
            propList: this.propList,
            URI: this.URI,
        }
    }
}