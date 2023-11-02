
import { resources } from "@/i18n";
import de from "@locals/de/translation.json";
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions { 
    resources: typeof resources.de;
  }
}
