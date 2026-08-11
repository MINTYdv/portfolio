export interface Greeting {
  text: string;
  helloCountLabel: (count: number) => string;
}

export const HELLO_GREETINGS: Greeting[] = [
  {
    text: "Hello 👋",
    helloCountLabel: (n) => (n === 1 ? "1 person has said hello" : `${n} people have said hello`),
  },
  {
    text: "Bonjour 👋",
    helloCountLabel: (n) => (n === 1 ? "1 personne a dit bonjour" : `${n} personnes ont dit bonjour`),
  },
  {
    text: "你好 👋",
    helloCountLabel: (n) => `${n} 人打过招呼`,
  },
  {
    text: "Hallo 👋",
    helloCountLabel: (n) => (n === 1 ? "1 Person hat Hallo gesagt" : `${n} Personen haben Hallo gesagt`),
  },
];
