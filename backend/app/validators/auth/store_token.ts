import vine from '@vinejs/vine';

export const storeTokenValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(7).maxLength(32).trim(),
  }),
);
