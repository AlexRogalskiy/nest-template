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

import { ListUsersResponseDto } from "ᐸDtosᐳ";

import { userDtoFactory } from "../common";

export const listUsersResponseDtoFactory = makeDtoFactory<ListUsersResponseDto>(
  () => ({
    users: userDtoFactory.buildList(faker.datatype.number(10)),

    nextPageToken: String(faker.datatype.number()),
  }),
);
