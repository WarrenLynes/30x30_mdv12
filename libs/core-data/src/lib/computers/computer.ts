export interface Computer {
  id: number;
  title: string;
  details: string;
  coolLevel: number;
  approved: boolean;
}

export const emptyComputer: Computer = {
  id: null,
  title: '',
  details: '',
  coolLevel: 0,
  approved: false
};
