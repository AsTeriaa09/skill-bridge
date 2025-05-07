import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

interface LeaderboardEntry {
  id: number
  name: string
  avatar: string
  points: number
  rank: number
  department: string
  semester: string
  badges?: string[]
}

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  title?: string
  description?: string
}

export function Leaderboard({ entries, title = "Leaderboard", description }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                entry.rank <= 3 ? "bg-amber-50 dark:bg-amber-950/20" : "bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold text-sm">
                {entry.rank <= 3 ? (
                  <Award
                    className={`h-5 w-5 ${
                      entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-600"
                    }`}
                  />
                ) : (
                  entry.rank
                )}
              </div>
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${entry.avatar}`} alt={entry.name} />
                <AvatarFallback>{entry.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{entry.name}</div>
                <div className="text-xs text-muted-foreground">
                  {entry.department} • {entry.semester}
                </div>
                {entry.badges && entry.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {entry.badges.map((badge) => (
                      <Badge key={badge} variant="outline" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600">{entry.points.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
