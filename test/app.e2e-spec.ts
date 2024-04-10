import request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import {config} from 'src/config/config';
import {SuccessInterceptor} from 'src/interceptors/sucess.interceptor';

// console.log = jest.fn(); // https://github.com/jmcdo29/testing-nestjs/blob/main/apps/cqrs-sample/test/app.e2e-spec.ts

describe('app: NestFastifyApplication', () => {
  const fastifyAdapter = new FastifyAdapter({
    bodyLimit: 2 * 1024 * 1024,
  });
  let app: NestFastifyApplication;
  let token: string = '';

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(fastifyAdapter);
    app.useGlobalInterceptors(new SuccessInterceptor());
    await app.register(fastifyCookie, {secret: config.JWT_ACCESS_TOKEN_SECRET});
    await app.init();
    await app.listen(80, '0.0.0.0');

    // jest.mock('./auth.test', async () => {
    //   token = await loginUser(app);
    // });
  });

  afterAll(async () => {
    await app.close();
  });

  it(`1. Health check >> / (GET)`, () => {
    return request(app.getHttpServer())
      .get('/welcome')
      .expect(200)
      .expect(res => res.body.data === 'Welcome to School News Feed Service API Server');
  });

  it(`2. Login >> /auth/login (POST)`, async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({id: 'july', password: '^j2024$'})
      .expect(201)
      .expect(res => {
        // expect(res.type).toEqual('application/json');
        expect(res.body.success).toBeTruthy();
        token = res.body.data;
        console.debug(`token.length = ${token.length}`);
        expect(token.length).toBeGreaterThan(160);
      });
  });

  it(`3. Query subscription-news (GET)`, async () => {
    return request(app.getHttpServer())
      .get('/subscription/news/query?school_id=6613d6743f643554503bd562')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(res => {
        expect(res.body.success).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      });
  });
});
