import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { TaxProfileFactory } from '#database/factories/tax_profile_factory';
import { UserFactory } from '#database/factories/user_factory';
import TaxProfile from '#models/tax_profile';

test.group('paginate tax profiles test', (group) => {
  const endpoint = 'api.perfiles.index';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());
  test('pagination tax profiles', async ({ client, route }) => {
    const user = await UserFactory.create();
    await TaxProfileFactory.createMany(10);

    const response = await client
      .get(route(endpoint))
      .qs({
        page: 1,
        limit: 1,
      })
      .accept('json')
      .loginAs(user);

    const expectedTaxProfile = await TaxProfile.firstOrFail();
    response.assertBodyContains({
      data: {
        data: [expectedTaxProfile.serialize()],
      },
    });
  });
});
