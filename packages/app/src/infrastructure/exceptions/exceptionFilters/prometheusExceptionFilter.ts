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

import { CounterMetric, PromService } from "@digikare/nestjs-prom";
import { normalizePath } from "@digikare/nestjs-prom/dist/utils";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";

@Catch()
export class PrometheusExceptionFilter implements ExceptionFilter<unknown> {
  private readonly counter: CounterMetric;

  public constructor(promService: PromService) {
    this.counter = promService.getCounter({
      name: "http_exceptions",
      labelNames: ["method", "status", "path"],
    });
  }

  public catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request: Request = context.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const path = normalizePath(request.url, [], "#val");

    this.counter.inc({
      method: request.method,
      path,
      status,
    });
  }
}
