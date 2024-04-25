export const pingProtectEvaluate = {
  authId: 'foo',
  callbacks: [
    {
      type: 'PingOneProtectEvaluationCallback',
      output: [
        {
          name: 'pauseBehavioralData',
          value: true,
        },
      ],
      input: [
        {
          name: 'IDToken1signals',
          value: '',
        },
        {
          name: 'IDToken1clientError',
          value: '',
        },
      ],
    },
  ],
} as const;
