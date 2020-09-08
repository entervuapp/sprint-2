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

export interface ValueDescriptionId {
  value: string;
  description: string;
  id: number;
}

export interface SkillAndRound {
  skill: ValueDescriptionId;
  numberOfRounds: number;
}

export interface SkillAndActive {
  skill: ValueDescription;
  active: boolean;
  id: number;
}

export interface SkillWithCount {
  skill: Skill;
  count: number;
}

export interface Skill {
  createdBy: string;
  createdDate: string;
  description: string;
  id: number;
  lastUpdatedBy: string;
  updatedDate: string;
  value: string;
}

export interface NewAny {
  [key: string]: string | boolean | number | object | NewAny[] | null;
}
