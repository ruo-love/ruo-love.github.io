### @zrcode/storage

localstorage 支持设置加密 有效期 前缀

```
npm i @zrcode/storage

```

``` javascript

export interface StorageData<T> {
  value: T;
  expire: number | null;
}
export interface Local {
  [key: string]: any;
}

declare function createLocalStorage<T extends Local>(
    prefix?: string,  //前缀
    encrypt?: boolean,  //是否加密
    salt?: string  // 盐
  ): {
    set<K extends keyof T>(key: K, value: T[K], expire: number | null): void;
    get<K extends keyof T>(key: K): T[K] | null;
    remove<K extends keyof T>(key: K);
    clear();
  };


```