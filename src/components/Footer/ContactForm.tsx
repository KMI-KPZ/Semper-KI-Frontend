import React from "react";
import {useTranslation} from "react-i18next";
import logger from "@/hooks/useLogger";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@component-library/Button";
import {Heading, Text} from "@component-library/Typography";
import {getCustomAxios} from "@/hooks/useCustomAxios";
import {toast} from "@/pages/App/hooks/useToast";

interface ContactFormProps {
    closeEdit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
        const {closeEdit} = props;
        const {t} = useTranslation();
        const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/contact/`;
        const schema = yup
            .object().shape({
                email: yup
                    .string()
                    .email(t("yup.email"))
                    .required(t("yup.required", {name: t("Organization.Info.email")})),
                subject: yup
                    .string()
                    .required(t("yup.required", {name: t("data.ContactForm.subject")})
                    ),
                name: yup
                    .string()
                    .required(t("yup.required", {name: t("data.ContactForm.name")})),
                message: yup
                    .string()
                    .required(t("yup.required", {name: t("data.ContactForm.message")})),

            })
            .required();
        type FormData = yup.InferType<typeof schema>;

        const {
            reset,
            register,
            watch,
            handleSubmit,
            formState: {errors},

        } = useForm<FormData>({
            resolver: yupResolver(schema),
            defaultValues: {
                email: "",
                subject: "Meine Anfrage",
                name: "",

            },

        });

        const onSubmit = (data: FormData) => {
            logger("onSubmit", data);
            getCustomAxios().post(apiUrl, data).then((response) => {
                    logger("response", response);
                    if(response.data.result === false) {
                        toast(t("data.ContactForm.error"))
                        return;
                    }
                    toast(t("data.ContactForm.success"))
                }
            ).catch((error) => {
                toast(t("data.ContactForm.error"))
                logger("error", error);
            });
            closeEdit();
        };

        // for each field in schema
        for (const field in schema.fields) {
            logger("field", field);
            logger("errors", errors);
        }

        return (
            <div className="bg-white p-10  ">
                <Heading variant="h2" className={`text-center p-5`}>{t("components.Footer.ContactForm.title")}</Heading>
                <form
                    className={`flex w-full flex-col flex-wrap items-center justify-center gap-5 bg-white p-5 md:flex-row`}>
                    {Object.keys(schema.fields).map((key) => {
                        const fieldName = key as keyof FormData;
                        return (<div className={`flex w-full flex-col items-center gap-5 md:flex-row`}>
                            <Text className={`w-2/12`} variant={`body`}>{t(`data.ContactForm.${key}`)}</Text>
                            {key !== 'message' ?
                                <input type={`text`}
                                       className={`w-full bg-slate-100 px-3 py-2 md:w-fit md:flex-grow ${errors.name !== undefined ? " border-red-500 bg-red-500 " : ""} `}
                                       placeholder={t(`data.ContactForm.${key}`)}
                                       {...register(fieldName)}
                                /> :
                                <textarea
                                    className={`w-full bg-slate-100 px-3 py-2 h-32 md:w-fit md:flex-grow ${errors.name !== undefined ? " border-red-500 bg-red-500 " : ""} `}
                                    placeholder={t(`data.ContactForm.${key}`)}
                                    {...register(fieldName)}>
                                {t(`data.ContactForm.${key}`)}
                                </textarea>
                            }
                        </div>);
                    })}
                    <Button
                        title={t(`data.ContactForm.button`)}
                        onClick={handleSubmit(onSubmit)}
                    />
                </form>
            </div>);
    }
;

export default ContactForm;
