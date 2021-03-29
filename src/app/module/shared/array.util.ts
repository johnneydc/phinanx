export class ArrayUtil {
  public static chunks<T>(arr: T[], chunkSize: number): T[][] {
    const R = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
}
