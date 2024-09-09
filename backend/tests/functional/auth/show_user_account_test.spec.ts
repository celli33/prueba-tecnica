import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { UserFactory } from '#database/factories/user_factory';

test.group('User account info test', (group) => {
  const endpoint = 'api.accounts.users.show';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());
  test('show auth user', async ({ client, route }) => {
    const authUser = await UserFactory.create();

    const response = await client.get(route(endpoint)).accept('json').loginAs(authUser);

    response.assertStatus(200);
    response.assertBodyContains({ data: authUser.serialize(), message: 'Usuario autenticado mostrado.' });
  });

  test('show auth user without token', async ({ client, route }) => {
    const response = await client.get(route(endpoint)).accept('json');

    response.assertStatus(401);
  });
});
