import Editor from '@/components/editor/editor'

type NotePageProps = {
  params: {
    id: string
  }
}

export default function NotePage({ params }: NotePageProps) {
  return <Editor />
}
