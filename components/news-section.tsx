import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, User } from 'lucide-react'

export function NewsSection() {
  const newsItems = [
    {
      id: 1,
      category: 'Game Update',
      title: 'Season 2 Reloaded: New Weapons and Map Changes Coming to Warzone',
      image: '/placeholder.svg?height=300&width=400&text=Weapon+Loadouts',
      author: 'Alex Wilson',
      avatar: '/placeholder.svg?height=40&width=40',
      timeAgo: '2 hours ago',
      featured: true
    },
    {
      id: 2,
      category: 'Esports',
      title: 'CDL Major 2 Qualifiers: Top Teams to Watch',
      image: '/placeholder.svg?height=300&width=400&text=CDL+Tournament',
      author: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      category: 'Community',
      title: 'Popular Loadouts After Recent Weapon Balancing',
      image: '/placeholder.svg?height=300&width=400&text=Weapon+Loadouts',
      author: 'Marcus Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      timeAgo: '6 hours ago'
    },
    {
      id: 4,
      category: 'Tips & Tricks',
      title: 'Master the New Movement Mechanics in Warzone',
      image: '/placeholder.svg?height=300&width=400&text=Movement+Mechanics',
      author: 'Emily Rodriguez',
      avatar: '/placeholder.svg?height=40&width=40',
      timeAgo: '8 hours ago'
    },
    {
      id: 5,
      category: 'Patch Notes',
      title: 'Latest Hotfix: Addressing Server Stability and Bug Fixes',
      image: '/placeholder.svg?height=300&width=400&text=Server+Maintenance',
      author: 'David Lee',
      avatar: '/placeholder.svg?height=40&width=40',
      timeAgo: '10 hours ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Featured News */}
      {newsItems.filter(item => item.featured).map(item => (
        <Card key={item.id} className="overflow-hidden bg-[#0F0F10] border border-white/10">
          <div className="relative h-[400px] w-full">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <Badge variant="secondary" className="mb-2 bg-[#1A1A1A] text-gray-300 hover:bg-[#1A1A1A]">
                {item.category}
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">{item.author}</span>
                    <span className="mx-2">·</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* News Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {newsItems.filter(item => !item.featured).map(item => (
          <Card key={item.id} className="overflow-hidden bg-[#0F0F10] border border-white/10">
            <div className="relative h-[240px]">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-2 bg-[#1A1A1A] text-gray-300 hover:bg-[#1A1A1A]">
                {item.category}
              </Badge>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">{item.author}</span>
                    <span className="mx-2">·</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

