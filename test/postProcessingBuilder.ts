import { OntoNodeProperty } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { EPostProcessingOptionType, PostProcessingProps } from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";


export class PostProcessingBuilder {
    id: string="postProcessingID";
    title: string ="postProcessingTitle";
    checked: boolean = false;
    value: string = "value";
    propList: OntoNodeProperty[]= [];
    type: EPostProcessingOptionType = EPostProcessingOptionType.number;
    imgPath: string = "https://test.test.png";

    withId(id:string):PostProcessingBuilder {
        this.id = id;
        return this;
    }
    withTitle(title:string):PostProcessingBuilder {
        this.title = title;
        return this;
    }
    withChecked(checked:boolean):PostProcessingBuilder {
        this.checked = checked;
        return this;
    }
    withValue(value:string):PostProcessingBuilder {
        this.value = value;
        return this;
    }
    withPropList(propList:OntoNodeProperty[]):PostProcessingBuilder {
        this.propList = propList;
        return this;
    }
    withType(type:EPostProcessingOptionType):PostProcessingBuilder {
        this.type = type;
        return this;
    }
    withImgPath(imgPath:string):PostProcessingBuilder {
        this.imgPath = imgPath;
        return this;
    }


    build():PostProcessingProps {
        return {
            id: this.id,
            title: this.title,
            checked: this.checked,
            value: this.value,
            valueList: this.propList,
            type: this.type,
            imgPath: this.imgPath,
        }
    }
}