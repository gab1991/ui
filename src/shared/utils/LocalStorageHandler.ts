export class LocalStorageHandler {
  static getItem(key: string): string | undefined {
    return localStorage[key];
  }

  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
