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

import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

import { BaseExceptionFilter } from "./baseExceptionFilter";
import { PrometheusExceptionFilter } from "./prometheusExceptionFilter";

@Catch()
export class CatchAllExceptionFilter implements ExceptionFilter<unknown> {
  public constructor(
    private readonly baseExceptionFilter: BaseExceptionFilter,
    private readonly prometheusExceptionFilter: PrometheusExceptionFilter,
  ) {}

  public catch(exception: unknown, host: ArgumentsHost): void {
    this.prometheusExceptionFilter.catch(exception, host);
    this.baseExceptionFilter.catch(exception, host);
  }
}
