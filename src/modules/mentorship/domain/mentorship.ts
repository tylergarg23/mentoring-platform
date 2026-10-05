export interface Mentorship {
  id: string;
  title: string;
  description: string;
  price: number;
  active: boolean;
}

export function isMentorshipAvailable(mentorship: Mentorship): boolean {
  return mentorship.active;
}
