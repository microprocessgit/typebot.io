import { TextInput } from '@/components/inputs'
import { Stack } from '@chakra-ui/react'
import { TimerBlock } from '@typebot.io/schemas'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { byId, isNotEmpty } from '@typebot.io/lib'
import { Select } from '@/components/inputs/Select'
import { BlockIcon } from '@/features/editor/components/BlockIcon'
import React from 'react'

type Props = {
  groupId: string
  options?: TimerBlock['options']
  onOptionsChange: (options: TimerBlock['options']) => void
}


export const TimerSettings = ({ groupId, options, onOptionsChange }: Props) => {
  const { typebot } = useTypebot()

  const handleTimerChange = (timer: string) =>
    onOptionsChange({ ...options, timer })
  
  const handleIdChange = (id: string) =>
    onOptionsChange({ ...options, id })

  const handleGroupIdChange = (groupId?: string) =>
    onOptionsChange({ ...options, groupId })

  const handleBlockIdChange = (blockId?: string) =>
    onOptionsChange({ ...options, blockId })

  const currentGroupId = typebot?.groups.find(byId(groupId))?.id

  const selectedGroup = typebot?.groups.find(byId(options?.groupId))

  if (!typebot) return null


return (
  <Stack spacing={4}>
    <TextInput
      label="Timer:"
      defaultValue={
        options?.timer
      }
      placeholder='Enter the minutes'
      onChange={handleTimerChange}
    />
    <TextInput
      label="Id:"
      defaultValue={
        options?.id
      }
      placeholder='Enter the id'
      onChange={handleIdChange}
    />
    <Select
      items={typebot.groups
        .filter(
          (group) => group.id !== currentGroupId && isNotEmpty(group.title)
        )
        .map((group) => ({
          label: group.title,
          value: group.id,
        }))}
        selectedItem={selectedGroup?.id}
        onSelect={handleGroupIdChange}
        placeholder="Select a group"
      />
      {selectedGroup && selectedGroup.blocks.length > 1 && (
        <Select
          selectedItem={options?.blockId}
          items={selectedGroup.blocks.map((block, index) => ({
            label: `Block #${(index + 1).toString()}`,
            value: block.id,
            icon: <BlockIcon type={block.type} />,
          }))}
          onSelect={handleBlockIdChange}
          placeholder="Select a block"
        />
      )}
  </Stack>
)
}

