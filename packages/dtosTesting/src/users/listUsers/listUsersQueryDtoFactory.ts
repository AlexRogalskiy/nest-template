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

import { makeDtoFactory } from "@byndyusoft/dto-factory";
import { faker } from "@faker-js/faker";

import { ListUsersQueryDto } from "ᐸDtosᐳ";

export const listUsersQueryDtoFactory = makeDtoFactory<ListUsersQueryDto>(
  () => ({
    userIds: Array.from({ length: faker.datatype.number(10) }).map(() =>
      String(faker.datatype.number()),
    ),
    names: Array.from({ length: faker.datatype.number(10) }).map(() =>
      faker.name.fullName(),
    ),
    emails: Array.from({ length: faker.datatype.number(10) }).map(() =>
      faker.internet.email(),
    ),

    pageSize: faker.datatype.number(),
    pageToken: String(faker.datatype.number()),
  }),
);
