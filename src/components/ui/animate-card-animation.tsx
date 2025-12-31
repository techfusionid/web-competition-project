"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { competitions } from "@/data/competitions"
import { Competition } from "@/types/competition"

interface Card {
  id: number
  competition: Competition
}

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

const exitAnimation = {
  y: 340,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

// Get random competitions
function getRandomCompetitions(count: number): Competition[] {
  const shuffled = [...competitions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function CardContent({ competition }: { competition: Competition }) {
  return (
    <div className="relative flex flex-col rounded-xl border border-border bg-card shadow-lg overflow-hidden h-[320px]">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={competition.imageUrl}
          alt={competition.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-1">
          <h3 className="font-bold text-foreground text-lg line-clamp-2">{competition.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{competition.organizer}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-primary font-medium">{competition.category}</span>
          <Button size="sm" variant="ghost" className="gap-1 text-sm">
            Lihat
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
}: {
  card: Card
  index: number
  isAnimating: boolean
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      layout
      initial={initialAnim}
      animate={{ scale, y, zIndex }}
      exit={exitAnim}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute w-full cursor-pointer"
    >
      <CardContent competition={card.competition} />
    </motion.div>
  )
}

export default function AnimatedCardStack() {
  const [randomComps] = useState(() => getRandomCompetitions(10))
  const [cards, setCards] = useState<Card[]>(() => 
    randomComps.slice(0, 3).map((comp, i) => ({ id: i + 1, competition: comp }))
  )
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(4)
  const [compIndex, setCompIndex] = useState(3)

  const handleAnimate = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const nextComp = randomComps[compIndex % randomComps.length]

    setTimeout(() => {
      setCards(prev => [...prev.slice(1), { id: nextId, competition: nextComp }])
      setNextId(prev => prev + 1)
      setCompIndex(prev => prev + 1)
      setIsAnimating(false)
    }, 100)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="relative h-[380px] w-full max-w-sm">
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <AnimatePresence mode="popLayout">
            {cards.slice(0, 3).map((card, index) => (
              <AnimatedCard
                key={card.id}
                card={card}
                index={index}
                isAnimating={isAnimating}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handleAnimate}
          disabled={isAnimating}
          size="lg"
          className="px-8"
        >
          🎲 Acak Kompetisi
        </Button>
        <p className="text-sm text-muted-foreground">
          Klik untuk menemukan kompetisi secara acak
        </p>
      </div>
    </div>
  )
}
