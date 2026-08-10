export interface Greeting {
  text: string;
  helloCountLabel: (count: number) => string;
}

export const HELLO_GREETINGS: Greeting[] = [
  {
    text: "Bonjour 👋",
    helloCountLabel: (n) => (n === 1 ? "1 personne a dit bonjour" : `${n} personnes ont dit bonjour`),
  },
  {
    text: "Hello 👋",
    helloCountLabel: (n) => (n === 1 ? "1 person has said hello" : `${n} people have said hello`),
  },
  {
    text: "你好 👋",
    helloCountLabel: (n) => `${n} 人打过招呼`,
  },
  {
    text: "Hola 👋",
    helloCountLabel: (n) => (n === 1 ? "1 persona ha dicho hola" : `${n} personas han dicho hola`),
  },
  {
    text: "Ciao 👋",
    helloCountLabel: (n) => (n === 1 ? "1 persona ha detto ciao" : `${n} persone hanno detto ciao`),
  },
  {
    text: "Hallo 👋",
    helloCountLabel: (n) => (n === 1 ? "1 Person hat Hallo gesagt" : `${n} Personen haben Hallo gesagt`),
  },
  {
    text: "Olá 👋",
    helloCountLabel: (n) => (n === 1 ? "1 pessoa disse olá" : `${n} pessoas disseram olá`),
  },
  {
    text: "こんにちは 👋",
    helloCountLabel: (n) => `${n}人が挨拶しました`,
  },
];
