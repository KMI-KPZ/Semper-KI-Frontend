import React from "react";

export interface QuestionType {
  id: number;
  question: string;
  answers: AnswerType;
}

export interface AnswerType {
  options?: string[];
  unit?: string[];
  input?: string[];
}

const Questions: QuestionType[] = [
  {
    id: 0,
    question: "Auftragstyp",
    answers: { options: ["Privat", "Gewerblich", "nicht Angeben"] },
  },
  {
    id: 1,
    question: "Boxmaße des Bauteils",
    answers: {
      options: ["Boxmaße angeben", "nicht Angeben"],
      input: ["Höhe", "Breite", "Tiefe"],
      unit: ["m", "cm", "mm", "μm"],
    },
  },
  {
    id: 2,
    question: "Oberfläche des Bauteils",
    answers: {
      options: ["Oberfläche angeben", "nicht Angeben"],
      input: ["Oberfläche"],
      unit: ["m²", "cm²", "mm²", "μm²"],
    },
  },
  {
    id: 3,
    question: "Volumen des Bauteils",
    answers: {
      options: ["Volumen angeben", "nicht Angeben"],
      input: ["Volumen"],
      unit: ["m³", "cm³", "mm³", "μm³"],
    },
  },
  {
    id: 4,
    question: "Gibt es ein 3D-Modell?",
    answers: {
      options: [
        "Nein",
        "Ja und ich möchte es hochladen",
        "Ja aber ich möchte es nicht hochladen",
        "nicht Angeben",
      ],
    },
  },
  {
    id: 5,
    question: "Anzahl der Teile",
    answers: {
      options: ["Anzahl angeben", "nicht Angeben"],
      input: ["Anzahl"],
    },
  },
  {
    id: 6,
    question: "Gewicht pro Teil",
    answers: {
      options: ["Gewicht angeben", "nicht Angeben"],
      input: ["Gewicht"],
      unit: ["t", "kg", "g", "mg"],
    },
  },
  {
    id: 7,
    question: "Preisvorstellung",
    answers: {
      options: ["Preis angeben", "nicht Angeben"],
      input: ["Pro Teil", "Gesamt"],
      unit: ["€"],
    },
  },
  {
    id: 8,
    question: "Lieferzeit/Produktionszeit",
    answers: {
      options: ["Zeit angeben", "nicht Angeben"],
      input: [
        "Lieferzeit",
        "Produktionszeit Gesamt",
        "Produktionszeit pro Teil",
      ],
      unit: ["Jahr", "Monat", "Tage"],
    },
  },
  {
    id: 9,
    question: "Prozessfortschritt",
    answers: {
      options: [
        "Modell in entwicklung",
        "Modell fertig",
        "Idee für ein Modell",
        "nicht Angeben",
      ],
    },
  },
];

const getQuestions = (): QuestionType[] => {
  return Questions;
};

export default getQuestions;
