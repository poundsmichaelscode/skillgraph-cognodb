import { describe, expect, it } from 'vitest';

describe('phase 1 test setup', () => {
  it('runs Vitest in the API workspace', () => {
    expect('skillgraph').toContain('graph');
  });
});
