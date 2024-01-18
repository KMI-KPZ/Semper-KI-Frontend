import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface useContactFormMutationsReturnProps {
  sendContactFormMutation: UseMutationResult<
    any,
    Error,
    ContactFormData,
    unknown
  >;
}

export type ContactFormData = {
  email: string;
  subject: string;
  name: string;
  message: string;
};

const useContactFormMutations = (): useContactFormMutationsReturnProps => {
  const { t } = useTranslation();
  const sendContactFormMutation = useMutation<any, Error, ContactFormData>({
    mutationFn: async (data) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/contact/`;
      customAxios
        .post(apiUrl, data)
        .then((response) => {
          if (response.data.result === false) {
            toast(t("components.Footer.ContactForm.error"));
            return;
          }
          toast(t("components.Footer.ContactForm.success"));
        })
        .catch((error) => {
          toast(t("components.Footer.ContactForm.error"));
          logger("error", error);
        });
    },
  });

  return { sendContactFormMutation };
};

export default useContactFormMutations;
