import vine from '@vinejs/vine';

export const importInvoicesValidator = vine.compile(
  vine.object({
    file: vine.file({
      size: '2mb',
      extnames: ['zip'],
    }),
  }),
);
