import { OpenAI } from 'openai'
import { createAI, getMutableAIState, render } from 'ai/rsc'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function Spinner() {
  return <div>Loading...</div>
}

function FlightCard({ flightInfo }: { flightInfo: any }) {
  return (
    <div>
      <h2>Flight Information</h2>
      <p>Flight Number: {flightInfo.flightNumber}</p>
      <p>Departure: {flightInfo.departure}</p>
      <p>Arrival: {flightInfo.arrival}</p>
    </div>
  )
}

async function getFlightInfo(flightNumber: string) {
  return {
    flightNumber,
    departure: 'New York',
    arrival: 'San Francisco',
  }
}

async function submitUserMessage(userInput: string) {
  'use server'

  const aiState: any = getMutableAIState<typeof AI>()

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content: userInput,
    },
  ])

  // The `render()` creates a generated, streamable UI.
  const ui = render({
    model: 'gpt-4-0125-preview',
    provider: openai,
    messages: [
      { role: 'system', content: 'You are a flight assistant' },
      ...aiState.get(),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: 'assistant',
            content,
          },
        ])
      }

      return <p>{content}</p>
    },
    tools: {
      get_flight_info: {
        description: 'Get the information for a flight',
        parameters: z
          .object({
            flightNumber: z.string().describe('the number of the flight'),
          })
          .required(),
        render: async function* ({ flightNumber }) {
          yield <Spinner />

          const flightInfo = await getFlightInfo(flightNumber)

          aiState.done([
            ...aiState.get(),
            {
              role: 'function',
              name: 'get_flight_info',
              content: JSON.stringify(flightInfo),
            },
          ])

          return <FlightCard flightInfo={flightInfo} />
        },
      },
    },
  })

  return {
    id: Date.now(),
    display: ui,
  }
}

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  id?: string
  name?: string
}[] = []

const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

export const AI = createAI({
  actions: {
    submitUserMessage,
  },

  initialUIState,
  initialAIState,
})
