import { OntoNodeProperty } from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import { MaterialProps } from "@/api/Service/AdditiveManufacturing/Material/Querys/useGetMaterials";



export class MaterialBuilder {
    id: string="materialID";
    title: string="materialTitle";
    propList: OntoNodeProperty[]=[];
    URI: string="https://test.test.png";
    medianPrice: number=0;

    withId(id:string):MaterialBuilder {
        this.id = id;
        return this;
    }
    withTitle(title:string):MaterialBuilder {
        this.title = title;
        return this;
    }
    withPropList(propList:OntoNodeProperty[]):MaterialBuilder {
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
            imgPath: this.URI,
            medianPrice: this.medianPrice
        }
    }
}