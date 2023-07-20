import "i18next";
import de from "@locals/de/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof de;
    };
  }
}