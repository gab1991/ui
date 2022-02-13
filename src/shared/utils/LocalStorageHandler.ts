export class LocalStorageHandler {
  static getItem(key: string): string {
    return localStorage[key];
  }

  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
