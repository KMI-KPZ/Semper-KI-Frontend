import { EPostProcessingOptionType, IPostProcessing } from "@/pages/OrderRoutes/SubOrder/Service/Manufacturing/PostProcessing/PostProcessing";


export class PostProcessingBuilder {
    id: string="postProcessingID";
    title: string ="postProcessingTitle";
    checked: boolean = false;
    value: string = "value";
    valueList: string[]= ["value1", "value2"];
    type: EPostProcessingOptionType = EPostProcessingOptionType.number;
    URI: string = "https://test.test.png";

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
    withValueList(valueList:string[]):PostProcessingBuilder {
        this.valueList = valueList;
        return this;
    }
    withType(type:EPostProcessingOptionType):PostProcessingBuilder {
        this.type = type;
        return this;
    }
    withURI(URI:string):PostProcessingBuilder {
        this.URI = URI;
        return this;
    }


    build():IPostProcessing {
        return {
            id: this.id,
            title: this.title,
            checked: this.checked,
            value: this.value,
            valueList: this.valueList,
            type: this.type,
            URI: this.URI,
        }
    }
}