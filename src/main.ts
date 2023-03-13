import { NestFactory } from '@nestjs/core';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('MadMah')
    .setDescription('Madmah server description here')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('feline-ws', {
      url: 'ws://address',
      protocol: 'socket.io',
    })
    .build();

  const asyncapiDocument = await AsyncApiModule.createDocument(
    app,
    asyncApiOptions,
  );
  await AsyncApiModule.setup('api', app, asyncapiDocument);

  await app.listen(3001);
}
bootstrap();
