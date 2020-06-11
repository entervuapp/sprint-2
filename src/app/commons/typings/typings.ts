export interface Some {
  id: number;
  name: string;
  description?: string;
}

export interface Alerts {
  code: string;
  systemMessage: string;
}

export interface ValueDescription {
  value: string;
  description: string;
}
