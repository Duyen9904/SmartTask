import {
  activityFeedMock,
  groupChallengeBannerMock,
  groupsMock,
  leaderboardMock,
  onlineFriendsMock,
} from '../model/socialMockData'
import { ActivityFeed } from './components/ActivityFeed'
import { FriendsSidebar } from './components/FriendsSidebar'
import { GroupChallengesBanner } from './components/GroupChallengesBanner'
import { GroupsList } from './components/GroupsList'
import { LeaderboardWidget } from './components/LeaderboardWidget'

export function SocialHubView() {
  return (
    <div className="space-y-6">
      {/* Challenge banner — full width */}
      <GroupChallengesBanner banner={groupChallengeBannerMock} />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main feed — spans 2 cols */}
        <div className="lg:col-span-2">
          <ActivityFeed items={activityFeedMock} />
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <FriendsSidebar friends={onlineFriendsMock} />
          <GroupsList groups={groupsMock} />
          <LeaderboardWidget entries={leaderboardMock} />
        </div>
      </div>
    </div>
  )
}
