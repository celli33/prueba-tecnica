import vine from '@vinejs/vine';

export const calcualteIvaTaxValidator = vine.compile(
  vine.object({
    date: vine.date({ formats: ['MM-YYYY', 'M-YYYY'] }),
  }),
);
