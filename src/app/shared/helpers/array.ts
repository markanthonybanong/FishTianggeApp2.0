export function enumsToArray(enums: object): Array<string> {
    return Object.keys(enums).map((key) => {
      return enums[key];
    });
}