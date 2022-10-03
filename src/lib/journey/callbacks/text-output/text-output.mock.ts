import { CallbackType } from '@forgerock/javascript-sdk';

export default {
  authId: 'foo',
  callbacks: [
    {
      type: CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value: 'A red fox jumps over the lazy dog.',
        },
        {
          name: 'messageType',
          value: '0',
        },
      ],
    },
    {
      type: CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value: 'Have you read our <a href="#">privacy policy</a>?',
        },
        {
          name: 'messageType',
          value: '0',
        },
      ],
    },
    {
      type: CallbackType.TextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            'Dangerous script tag should be rendered as plaintext: <br/> <script>alert("pwned")</script>',
        },
        {
          name: 'messageType',
          value: '0',
        },
      ],
    },
    {
      type: CallbackType.SuspendedTextOutputCallback,
      output: [
        {
          name: 'message',
          value:
            'An email has been sent to the address you entered. Click the link in that email to proceed.',
        },
        {
          name: 'messageType',
          value: '0',
        },
      ],
    },
  ],
};

export const docsBaseExample = {
  type: CallbackType.TextOutputCallback,
  output: [
    {
      name: 'message',
      value: 'Default message',
    },
    {
      name: 'messageType',
      value: '0',
    },
  ],
};

export const docsSuspendedExample = {
  type: 'SuspendedTextOutputCallback',
  output: [
    {
      name: 'message',
      value: 'An email has been sent to your inbox.',
    },
    {
      name: 'messageType',
      value: '0',
    },
  ],
};
