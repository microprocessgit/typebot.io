import { Text, Tag } from '@chakra-ui/react'
import { TimerBlock } from '@typebot.io/schemas'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { byId, isDefined } from '@typebot.io/lib'

type Props = {
  options: TimerBlock['options']
}

export const TimerContent = ({ options }: Props) => {
  const { typebot } = useTypebot()
  const selectedGroup = typebot?.groups.find(byId(options?.groupId))
  const blockIndex = selectedGroup?.blocks.findIndex(byId(options?.blockId))
  if (!selectedGroup) return <Text color="gray.500">Configure...</Text>
  return (
    <Text>
      Jump to <Tag colorScheme="blue">{selectedGroup.title}</Tag>{' '}
      {isDefined(blockIndex) && blockIndex >= 0 ? (
        <>
          at block <Tag colorScheme="blue">{blockIndex + 1}</Tag>
        </>
      ) : null}
    </Text>
  )
}
