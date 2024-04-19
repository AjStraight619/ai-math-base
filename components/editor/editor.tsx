'use client'

import React, { useEffect, createElement } from 'react'

import { useTheme } from 'next-themes'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  EditorThemeClasses,
  LexicalNode,
  LexicalNodeReplacement,
  EditorState,
  $getRoot,
  $getSelection,
  $isRangeSelection,
} from 'lexical'

import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode, HeadingNode } from '@lexical/rich-text'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  ListItemNode,
} from '@lexical/list'

import { getErrorMessage } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

import './editor-styles.css'
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
} from 'lucide-react'

type HeadingTag = {
  headingType: 'h1' | 'h2' | 'h3'
  icon: JSX.Element
}

type ListTag = {
  listType: 'ol' | 'ul'
  icon: JSX.Element
}

const theme: EditorThemeClasses = {
  heading: {
    h1: 'editor-container h1',
    h2: 'editor-container h2',
    h3: 'editor-container h3',
  },
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    strikethrough: 'editor-text-strikethrough',
  },
  list: {
    ul: 'editor-container ul',
    ol: 'editor-container ol',
  },
}

function onError(err: unknown) {
  const error = getErrorMessage(err)
  console.error(error)
}

function HeadingToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const headingTags: HeadingTag[] = [
    {
      headingType: 'h1',
      icon: createElement(Heading1Icon, {
        size: '20',
      }),
    },
    {
      headingType: 'h2',
      icon: createElement(Heading2Icon, {
        size: '20',
      }),
    },
    {
      headingType: 'h3',
      icon: createElement(Heading3Icon, {
        size: '20',
      }),
    },
  ]
  const onClick = (tag: HeadingTag): void => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag.headingType))
      }
    })
  }

  return (
    <div className="flex items-center gap-x-2 pb-2">
      <ToggleGroup type="single">
        {headingTags.map((tag, tagIdx) => (
          <ToggleGroupItem
            onClick={() => onClick(tag)}
            value={tag.headingType}
            key={tagIdx}
          >
            {tag.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

function ListToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const listTags: ListTag[] = [
    {
      listType: 'ol',
      icon: createElement(ListOrderedIcon, {
        size: '20',
      }),
    },
    {
      listType: 'ul',
      icon: createElement(ListIcon, {
        size: '20',
      }),
    },
  ]
  const onClick = (tag: ListTag): void => {
    console.log(`Dispatching list command for: ${tag}`)
    const command =
      tag.listType === 'ol'
        ? INSERT_ORDERED_LIST_COMMAND
        : INSERT_UNORDERED_LIST_COMMAND
    editor.dispatchCommand(command, undefined)
  }

  return (
    <div className="flex items-center gap-x-2 pb-2">
      <ToggleGroup type="single">
        {listTags.map((tag, tagIdx) => (
          <ToggleGroupItem
            onClick={() => onClick(tag)}
            key={tagIdx}
            value={tag.listType}
          >
            {tag.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

function ToolbarPlugin() {
  return (
    <div className="flex gap-x-3 container">
      <HeadingToolbarPlugin />
      <ListToolbarPlugin />
    </div>
  )
}

const Editor = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container container">
        <ToolbarPlugin />
        <ListPlugin />
        <div className="relative border-2 border-muted-foreground rounded-md">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[400px] p-3 border-none outline-none" />
            }
            placeholder={
              <div className="absolute top-3 left-3">Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  )
}

export default Editor
