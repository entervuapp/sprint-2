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
}

export interface SkillWithCount {
  skill: ValueDescription;
  candidatesCount: boolean;
}
