import { TaxProfileFactory } from '#database/factories/tax_profile_factory';
import { UserFactory } from '#database/factories/user_factory';
import TaxProfile from '#models/tax_profile';
import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';

test.group('store tax profile test', (group) => {
  const endpoint = 'api.perfiles.store';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());
  test('tax profile created', async ({ client, route, assert }) => {
    const user = await UserFactory.create();
    const taxProfile = await TaxProfileFactory.make();

    const response = await client.post(route(endpoint)).json(taxProfile.serialize()).accept('json').loginAs(user);

    response.assertStatus(201);
    const taxProfileCreated = await TaxProfile.query().where('rfc', taxProfile.rfc).first();
    assert.isNotNull(taxProfileCreated);
  });

  test('tax profile repeated rfc', async ({ client, route }) => {
    const user = await UserFactory.create();
    await TaxProfileFactory.merge({
      rfc: 'XXXX010101XXXX',
    }).create();
    const taxProfileToCreate = await TaxProfileFactory.merge({
      rfc: 'XXXX010101XXXX',
    }).make();

    const response = await client
      .post(route(endpoint))
      .json(taxProfileToCreate.serialize())
      .accept('json')
      .loginAs(user);

    response.assertStatus(422);

    response.assertBody({
      errors: [
        {
          message: 'Regex inválida para el campo RFC',
          rule: 'regex',
          field: 'rfc',
        },
      ],
    });
  });
});
