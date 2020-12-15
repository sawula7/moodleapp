// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable } from '@angular/core';
import { CoreCourseUserAdminOrNavOptionIndexed } from '@features/courses/services/courses';
import { CoreUserProfile } from '@features/user/services/user';
import { CoreUserDelegateService, CoreUserProfileHandler, CoreUserProfileHandlerData } from '@features/user/services/user-delegate';
import { CoreNavHelper } from '@services/nav-helper';
import { makeSingleton } from '@singletons';
import { AddonBadges } from '../badges';

/**
 * Profile badges handler.
 */
@Injectable({ providedIn: 'root' })
export class AddonBadgesUserHandlerService implements CoreUserProfileHandler {

    name = 'AddonBadges';
    priority = 50;
    type = CoreUserDelegateService.TYPE_NEW_PAGE;

    /**
     * Check if handler is enabled.
     *
     * @return Always enabled.
     */
    isEnabled(): Promise<boolean> {
        return AddonBadges.instance.isPluginEnabled();
    }

    /**
     * Check if handler is enabled for this user in this context.
     *
     * @param user User to check.
     * @param courseId Course ID.
     * @param navOptions Course navigation options for current user. See CoreCoursesProvider.getUserNavigationOptions.
     * @return True if enabled, false otherwise.
     */
    async isEnabledForUser(
        user: CoreUserProfile,
        courseId: number,
        navOptions?: CoreCourseUserAdminOrNavOptionIndexed,
    ): Promise<boolean> {
        if (navOptions && typeof navOptions.badges != 'undefined') {
            return navOptions.badges;
        }

        // If we reach here, it means we are opening the user site profile.
        return true;
    }

    /**
     * Returns the data needed to render the handler.
     *
     * @return Data needed to render the handler.
     */
    getDisplayData(): CoreUserProfileHandlerData {
        return {
            icon: 'fas-trophy',
            title: 'addon.badges.badges',
            action: (event, user, courseId): void => {
                event.preventDefault();
                event.stopPropagation();
                CoreNavHelper.instance.goInSite('/badges/user', { courseId: courseId || 0, userId: user.id });
            },
        };
    }

}

export class AddonBadgesUserHandler extends makeSingleton(AddonBadgesUserHandlerService) {}