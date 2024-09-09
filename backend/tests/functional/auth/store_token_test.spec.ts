import testUtils from '@adonisjs/core/services/test_utils';
import { test } from '@japa/runner';
import { UserFactory } from '#database/factories/user_factory';

test.group('Create token', (group) => {
  const endpoint = 'api.tokens.store';

  group.each.setup(async () => testUtils.db().withGlobalTransaction());
  test('token created', async ({ client, route }) => {
    const user = await UserFactory.create();

    const response = await client
      .post(route(endpoint))
      .json({
        email: user.email,
        password: 'password',
      })
      .accept('json');

    response.assertStatus(201);
    response.assertBodyContains({data: {
      type: 'bearer',
    }});
  });

  test('empty request', async ({ client, route }) => {
    await UserFactory.create();

    const response = await client.post(route(endpoint)).json({}).accept('json');

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'required',
          message: 'El campo correo es requerido.',
        },
        {
          field: 'password',
          rule: 'required',
          message: 'El campo contraseña es requerido.',
        },
      ],
    });
  });

  test('bad email request', async ({ client, route }) => {
    await UserFactory.create();

    const response = await client
      .post(route(endpoint))
      .json({
        email: 'bad-email',
        password: 'password',
      })
      .accept('json');

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'email',
          message: 'El campo correo no es un correo válido.',
        },
      ],
    });
  });

  test('bad password is rejected', async ({ client, route }) => {
    const user = await UserFactory.create();

    const response = await client
      .post(route(endpoint))
      .json({
        email: user.email,
        password: 'bad-password',
      })
      .accept('json');

    response.assertStatus(400);
    response.assertBodyContains({
      errors: [
        {
          message: 'Credenciales inválidas.',
        },
      ],
    });
  });

  test('bad email is rejected', async ({ client, route }) => {
    const response = await client
      .post(route(endpoint))
      .json({
        email: 'bademail@example.com',
        password: 'password',
      })
      .accept('json');

    response.assertStatus(400);
    response.assertBodyContains({
      errors: [
        {
          message: 'Credenciales inválidas.',
        },
      ],
    });
  });
});