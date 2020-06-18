import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  public get = (key): string => {
    return localStorage.getItem(key);
  };

  public set = (key, value: string): void => {
    localStorage.setItem(key, value);
  };

  public delete = (key): void => {
    localStorage.removeItem(key);
  };
}
