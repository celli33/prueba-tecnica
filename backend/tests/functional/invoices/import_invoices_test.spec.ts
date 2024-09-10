import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { UserFactory } from '#database/factories/user_factory';
import { filePath } from '#tests/test_utils';

test.group('import invoices test', (group) => {
  const endpoint = 'api.facturas.store';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());
  test('import invoices test', async ({ client, route }) => {
    const user = await UserFactory.create();
    const zipPath = filePath('facturas.zip');
    const response = await client
      .post(route(endpoint))
      .file('file', zipPath, { filename: 'facturas.zip', contentType: 'application/x-zip' })
      .loginAs(user)
      .accept('json');

    response.assertStatus(201);
  });
});
