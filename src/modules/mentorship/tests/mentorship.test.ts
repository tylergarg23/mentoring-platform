import { describe, expect, it } from 'vitest';

import { isMentorshipAvailable, type Mentorship } from '../domain/mentorship';

describe('isMentorshipAvailable', () => {
  it('should return true when mentorship is active', () => {
    const mentorship: Mentorship = {
      id: 'mentorship-001',
      title: 'Mentoría QA Automation',
      description: 'Mentoría personalizada de automatización.',
      price: 150,
      active: true,
    };

    const result = isMentorshipAvailable(mentorship);

    expect(result).toBe(true);
  });

  it('should return false when mentorship is inactive', () => {
    const mentorship: Mentorship = {
      id: 'mentorship-002',
      title: 'Mentoría QA Automation',
      description: 'Mentoría personalizada de automatización.',
      price: 150,
      active: false,
    };

    const result = isMentorshipAvailable(mentorship);

    expect(result).toBe(false);
  });
});
