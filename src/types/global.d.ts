export {};

declare global {
  interface Window {
    Cypress?: any;
    store?: any;
  }
}
