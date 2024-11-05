import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/useToast";

export type ContactFormData = {
  email: string;
  subject: string;
  name: string;
  message: string;
};

const useSendContactForm = () => {
  const { t } = useTranslation();
  const sendContactForm = async (data: ContactFormData) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/contact/`, {
        data,
      })
      .then((response) => {
        logger("useSendContactForm | sendContactForm ✅ |", response);
        if (response.data.result === false) {
          toast(t("api.ContactForm.Mutation.useSendContactForm.error"));
          return;
        }
        toast(t("api.ContactForm.Mutation.useSendContactForm.success"));
      })
      .catch((error) => {
        logger("useSendContactForm | sendContactForm ❌ |", error);
        toast(t("api.ContactForm.Mutation.useSendContactForm.error"));
      });

  return useMutation<void, Error, ContactFormData>({
    mutationFn: sendContactForm,
    onSuccess: () => {},
  });
};

export default useSendContactForm;
