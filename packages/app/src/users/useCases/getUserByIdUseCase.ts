/*
 * Copyright 2022 Byndyusoft
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

import { Injectable } from "@nestjs/common";

import { ParamsWithUserIdDto, UserDto } from "ᐸDtosᐳ";

import { ListUsersQuery } from "../dataAccess";
import { UserNotFoundException } from "../exceptions";

@Injectable()
export class GetUserByIdUseCase {
  public constructor(private readonly listUsersQuery: ListUsersQuery) {}

  public async execute(params: ParamsWithUserIdDto): Promise<UserDto> {
    const users = await this.listUsersQuery.ask({
      userIds: [params.userId],
    });

    if (users.length === 0) {
      throw new UserNotFoundException(params.userId);
    }

    return users[0];
  }
}
