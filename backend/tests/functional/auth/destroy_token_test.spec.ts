import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { UserFactory } from '#database/factories/user_factory';

test.group('Destroy token test', (group) => {
  const endpoint = 'api.tokens.destroy';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());

  test('token deleted', async ({ client, route }) => {
    const user = await UserFactory.create();

    const response = await client.delete(route(endpoint)).accept('json').loginAs(user);

    response.assertStatus(204);
  });

  test('fails when not auth', async ({ client, route }) => {
    const response = await client.delete(route(endpoint)).accept('json');

    response.assertStatus(401);
    response.assertBodyContains({
      errors: [{ message: 'Acceso no autorizado.' }],
    });
  });
});
