import { 
  TimerBlock, 
  SessionState,
 } from '@typebot.io/schemas'
import { ExecuteIntegrationResponse } from '../../../types'
import got from 'got'
import { env } from '@typebot.io/env'
import { executeJumpBlock } from '../../logic/jump/executeJumpBlock' 
import { getNextGroup } from '../../../getNextGroup'
import { BubbleBlockWithDefinedContent, parseBubbleBlock } from '../../../parseBubbleBlock'

let timerBlock: TimerBlock;

export const setTimerBlock = (block: any): void => {
  timerBlock = block
}

export const executeTimerBlock = async (
  state: SessionState
): Promise<ExecuteIntegrationResponse> => {
  if (!timerBlock) return { outgoingEdgeId: undefined }
  const message = await getJumpMessage(state)
  if(env.URLTIMERAPI && message){
    try {
      await got
        .post(env.URLTIMERAPI, {
          json: {
            timer: timerBlock.options?.timer,
            id: getVariableId(timerBlock, state),
            message,  
          },
        })
        .json()
  
    } catch (e) {
      console.error(e)
      return log('Could not execute Timer request', 'error', timerBlock.outgoingEdgeId)
    }
  }
  return log('Sucess', 'sucess', timerBlock.outgoingEdgeId)
}

const log = (description: string, status:string, outgoingEdgeId: any) =>{ 
  return {
    outgoingEdgeId,
    logs: [
      {
        status: status,
        description,
      },
    ],
  }
}

export const executeTimerBlockFake = async (): Promise<ExecuteIntegrationResponse> => {
  return {outgoingEdgeId: undefined}
}

const getJumpMessage = async (state: SessionState) => {
  if (!timerBlock.options?.groupId) return { outgoingEdgeId: undefined }
  const res = executeJumpBlock(state, timerBlock.options)
  let nextGroup: any;
  let message: string = '';
  if(res.newSessionState){
    nextGroup = await getNextGroup(res.newSessionState)(res.outgoingEdgeId ?? undefined);
    message = nextGroup.group.blocks[0].content.richText[0].children[0].text
  }
  return message;
}

const getVariableId = (block:any, state: SessionState) => {
  const version: 1 | 2 = 2;
  let message:any;
  message = parseBubbleBlock(block as BubbleBlockWithDefinedContent, {
    version,
    variables: state.typebotsQueue[0].typebot.variables,
    typebotVersion: state.typebotsQueue[0].typebot.version,
  })
  return message.options.id;
}