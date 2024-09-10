import vine from '@vinejs/vine';
import cfdi40RegimenesFiscales from '../../constants/cfdi40_regimenes_fiscales.js';

export const storeTaxProfilenValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    rfc: vine
      .string()
      .regex(/^([A-Z&Ñ]{3,4}(\d{2})(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])([A-Z&Ñ\d]){3})$/u)
      .unique(async (db, value) => {
        const profile = await db.from('tax_profiles').where('rfc', value).first();

        return profile === null;
      }),
    taxRegimeCode: vine.enum(cfdi40RegimenesFiscales.map((item) => item.id)),
  }),
);
