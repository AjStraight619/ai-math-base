// import { OpenAI } from 'openai'
// import { render, getMutableAIState } from 'ai/rsc'

// const openai = new OpenAI()

// async function submitUserMessage(content: string) {
//   'use server'

//   const aiState = getMutableAIState()

//   // Update AI state with new message.
//   aiState.update([
//     ...aiState.get(),
//     {
//       role: 'user',
//       content,
//     },
//   ])

//   const ui = render({
//     model: 'gpt-4-turbo',
//     provider: openai,
//     messages: [
//       { role: 'system', content: 'You are a flight assistant' },
//       { role: 'user', content: userInput },
//     ],
//   })

//   return {
//     id: Date.now(),
//     display: ui,
//   }
// }
