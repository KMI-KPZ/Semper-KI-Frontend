# Helper for Status Buttons and Forms

## useStatusButton

- useStatusButton
  - location `src/pages/Projects/Project/hooks/useStatusButtons.tsx`
  - is used to load, transform and retrieve the status buttons for the process and projects
  - `getProjectStatusButtons: (processes: ProcessProps[]) => StatusButtonProcessProps[];`
    - returns the buttons for all selected processes to project
  - `getProcessStatusButtons: (process: ProcessProps) => StatusButtonProps[];`
    - returns the buttons for one specific process to process
  - `type StatusButtonTitleType`
    - is type for the title of the buttons. they have to be in the translation.json to fullfil ts support
  - `transformIcon = (icon: string): ReactNode`
    - transforms the strings to icon-components
    - when adding a new icon got to [MUI Icons](https://mui.com/material-ui/material-icons/) copy the import and add an case to the function with the name and the component
      - ```
        import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
        ...
        case "AccessAlarmIcon":
            return <AccessAlarmIcon />
        ```
    - `tranformTitle = (title: string): StatusButtonTitleType`
      - tranforms the strings to translated strings
      - when adding a new tranlation u have to do the following:
        - add the `newString` to `StatusButtonTitleType`
        - add the `newString` as key with translation to the translation.json
          - loaction translation file `assets/locals/de/translation.json`
          - ```
            {...
            "Projects":{
                ...
                "Project":{
                    ...
                    "hooks":{
                        ...
                        "useStatusButtons": {
                            ...
                            "newString": "newString translation"`
                            ...
                        }
                    }
                }
            }
            ...
            }
            ```
        - add the `newString` to the `validStatusButtonTitles` in the `tranformTitle` function
    - actions
      - `type:"navigate"`
        - navigates on the frontend to an specific url that is given in the to parameter
        - to:"/contractorSelection" is an absolute path replacing all other path in the url
        - to:"contractorSelection" is an relativ path adding to the end of the paths in the url
      - `type:"request"`
        - calls `/public/statusButtonRequest/` with all selected processes and the data from the button
        - location of the call `src/api/Process/useProcessMutations.tsx` in function `statusButtonRequestMutation`

## Forms

example Form

location `src/components/Form/ExampleForm.tsx`

```
export interface ExampleDataProps {
    text: string;
    count: number;
    email: string;
    area: string;
    isTrue: boolean;
}
```

is the return type of the submit function

```
const schema = yup.object().shape({
    text: yup
        .string()
        .required(
        t("yup.requiredName", { name: t("components.Form.ExampleForm.text") })
        ),
    count: yup.number().typeError(t("yup.number")).required(t("yup.required")),
    email: yup
        .string()
        .email(t("yup.email"))
        .required(
        t("yup.requiredName", { name: t("components.Form.ExampleForm.email") })
        ),
    area: yup.string().required(t("yup.required")),
    isTrue: yup.boolean().required(t("yup.required")),
});
```

is the schema for validating the form

the strings in yup function are the error messages that are shown when the critira is not met

```
const labelItems: InputLabelProps<ExampleDataProps>[] = [
    { label: "text", type: "text" },
    { label: "count", type: "number" },
    { label: "email", type: "text" },
    { label: "area", type: "textarea" },
    { label: "isTrue", type: "checkbox" },
];
```

this are the label that are rendered with the type that the input should have

creating a new form:

1. copy example file
2. rename `ExampleDataProps` and define hte interface with datatyps
3. modify `schema` to fit interface
4. modify `labelItems` to have every data from interface with associated type
5. add all translations to `translation.json` and change every `t(...)` function to use the right translation keys
6. should work :D
