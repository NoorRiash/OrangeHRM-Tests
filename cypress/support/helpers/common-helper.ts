export default class CommonHelper {
  static generateRandomEmployeeId(length: number = 5) {
    const id = Date.now().toString().slice(-5);
    return id;
  }

  static generateRandomUsername(length: number = 5) {
    let username = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
      username += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return username;
  }
}
