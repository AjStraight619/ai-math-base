import React from 'react'
import SectionDivider from './section-divider'
import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

const items: IndividualContent[] = [
  {
    label: 'Learning Engagement',
    content:
      'Dive into an interactive learning journey tailored to your pace and preferences. Ask questions, solve problems, and explore math concepts through a personalized educational experience designed to make learning both fun and effective.',
    icon: '/user.svg',
    bgColor: 'bg-teal-500/30',
    borderColor: 'border-teal-500',
  },
  {
    label: 'Interactive Tutoring',
    content:
      "Get instant, friendly, and understandable explanations for your math questions. Whether you're stuck on a problem or need a concept broken down, our AI tutor is here to offer hints, step-by-step solutions, and motivational support to keep you on track.",
    icon: '/gpt.svg',
    bgColor: 'bg-purple-500/30',
    borderColor: 'border-purple-500',
  },
  {
    label: 'Deep Problem Solving',
    content:
      'Harness the computational power of Wolfram Alpha for accurate answers, detailed step-by-step problem solving, and interactive graphs. From basic arithmetic to advanced calculus, our app ensures you have the tools to tackle math challenges with confidence.',
    icon: '/wolfram.svg',
    bgColor: 'bg-orange-500/30',
    borderColor: 'border-orange-500',
  },
]

const WhyMathBase = () => {
  return (
    <>
      <SectionDivider>How It Works</SectionDivider>
      <div className="container flex md:flex-row flex-col-reverse items-center">
        <Card className="flex-1">
          <CardContent className="py-4 space-y-4">
            {items.map((item, idx) => (
              <IndividualContent key={idx} {...item} />
            ))}
          </CardContent>
        </Card>
        <Image
          src="/circle.svg"
          width={300}
          height={300}
          alt="circle with elements"
        />
      </div>
    </>
  )
}

export default WhyMathBase

type IndividualContent = {
  label: string
  content: string
  icon: string
  bgColor: string
  borderColor: string
}

const IndividualContent = ({
  label,
  content,
  icon,
  bgColor,
  borderColor,
}: IndividualContent) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-x-2 pb-4">
        <div className={`p-2 rounded-lg border ${borderColor} ${bgColor}`}>
          <Image src={icon} width={40} height={40} alt="icon" />
        </div>
        <h2 className="font-poppins text-2xl text-muted-foreground">{label}</h2>
      </div>
      <p className="font-serif">{content}</p>
    </div>
  )
}
