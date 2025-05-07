import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Gift, Star, Trophy } from "lucide-react"

interface RewardsCardProps {
  points: number
  nextMilestone: number
  badges: {
    name: string
    description: string
    earned: boolean
    icon: "star" | "trophy" | "award" | "gift"
  }[]
}

export function RewardsCard({ points, nextMilestone, badges }: RewardsCardProps) {
  const progress = (points / nextMilestone) * 100

  const getIcon = (icon: string) => {
    switch (icon) {
      case "star":
        return <Star className="h-5 w-5" />
      case "trophy":
        return <Trophy className="h-5 w-5" />
      case "award":
        return <Award className="h-5 w-5" />
      case "gift":
        return <Gift className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards & Achievements</CardTitle>
        <CardDescription>Track your progress and earn rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Your Points</div>
            <div className="text-sm text-muted-foreground">
              {points.toLocaleString()} / {nextMilestone.toLocaleString()}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground mt-2">
            {Math.round(nextMilestone - points).toLocaleString()} points until next milestone
          </div>
        </div>

        <div>
          <div className="font-medium mb-3">Badges & Achievements</div>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  badge.earned ? "bg-amber-50 dark:bg-amber-950/20" : "bg-muted/30 opacity-60"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    badge.earned ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {getIcon(badge.icon)}
                </div>
                <div>
                  <div className="font-medium text-sm">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                  {badge.earned && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
