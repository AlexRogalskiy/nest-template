/*
 * Copyright 2021 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import os from "os";

import { LogLevel } from "@byndyusoft/pino-logger-factory";
import { DynamicModule, Module } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { ConfigDto } from "./dtos";

@Module({})
export class ConfigModule {
  public static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: [
        {
          provide: ConfigDto,
          useFactory: () => ConfigModule.configFactory(),
        },
      ],
      exports: [ConfigDto],
    };
  }

  private static async configFactory(): Promise<ConfigDto> {
    const config = ConfigModule.loadConfig();
    await ConfigModule.validateConfig(config);

    return config;
  }

  private static loadConfig(): ConfigDto {
    const plainConfig: ConfigDto = {
      configEnv: process.env.CONFIG_ENV as string,
      pg: {
        writeConnectionString: process.env.PG_WRITE_CONNECTION_STRING as string,
        readConnectionString: process.env.PG_READ_CONNECTION_STRING as string,
        connectionTimeout: Number(process.env.PG_CONNECTION_TIMEOUT ?? "60000"),
        poolSize: Number(process.env.PG_POOL_SIZE ?? "10"),
      },
      http: {
        port: Number(process.env.HTTP_PORT ?? "8080"),
        host: process.env.HTTP_HOST ?? "0.0.0.0",
        swaggerServer: process.env.SWAGGER_SERVER ?? "/",
        defaultClientTimeout: Number(
          process.env.HTTP_DEFAULT_CLIENT_TIMEOUT ?? "60000",
        ),
      },
      logger: {
        level: (process.env.LOGGER_LEVEL ?? LogLevel.info) as LogLevel,
        pretty: (process.env.LOGGER_PRETTY ?? "false") === "true",
      },
    };

    return plainToClass(ConfigDto, plainConfig);
  }

  private static async validateConfig(config: ConfigDto): Promise<void> {
    const errors = await validate(config, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new Error(errors.map((x) => x.toString()).join(os.EOL));
    }
  }
}
