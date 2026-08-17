/**
 * Moved unchanged (values/ordering/highlight flag) from
 * src/components/PipelineSection.tsx's local PIPELINE_STEPS array.
 * titleKo/titleEn -> title.ko/title.en, descKo/descEn -> description.ko/en.
 */
import { PipelineStep } from '../model/types';

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'encoding',
    step: '01',
    name: 'ENCODING',
    title: { ko: '원시 텍스트 입력', en: 'Raw Text Input' },
    description: {
      ko: '사용자가 작성한 자연어 문자열(유니코드 UTF-8 바이트 시퀀스)을 그대로 수신합니다.',
      en: 'Receives the raw natural language string as a UTF-8 unicode byte stream.',
    },
    highlight: false,
  },
  {
    id: 'tokenization',
    step: '02',
    name: 'TOKENIZATION',
    title: { ko: '토큰 분절 및 매핑', en: 'Tokenization & Mapping' },
    description: {
      ko: 'BPE 어휘집 사전을 기반으로 텍스트를 서브워드 토큰 조각으로 분절하고 고유 정수 ID로 변환합니다. (언어별 격차 발생 지점)',
      en: 'Segments text into subword token units using BPE vocabulary mapping. (Origin of linguistic gap)',
    },
    highlight: true,
  },
  {
    id: 'payload',
    step: '03',
    name: 'PAYLOAD',
    title: { ko: '컨텍스트 적재', en: 'Context Payload' },
    description: {
      ko: '분절된 토큰 시퀀스가 트랜스포머 모델의 유한한 컨텍스트 윈도우(Context Window) 슬롯에 순차 배치됩니다.',
      en: 'Token sequences fill the finite context window slots in the Transformer architecture.',
    },
    highlight: false,
  },
  {
    id: 'processing',
    step: '04',
    name: 'PROCESSING',
    title: { ko: '주의 집중 및 행렬 연산', en: 'Attention & Matrix Compute' },
    description: {
      ko: '토큰 수(N)에 비례하여 셀프 어텐션(Self-Attention) 연산 비용과 메모리 대역폭이 소모됩니다.',
      en: 'Self-attention compute cost and KV cache memory scale directly with token count (N).',
    },
    highlight: false,
  },
  {
    id: 'output',
    step: '05',
    name: 'OUTPUT',
    title: { ko: '토큰 단위 생성 및 디코딩', en: 'Generation & Decoding' },
    description: {
      ko: '다음 토큰을 확률적으로 하나씩 생성(Autoregressive)한 뒤 다시 인간이 읽을 수 있는 문장으로 복원합니다.',
      en: 'Autoregressively generates output tokens sequentially and decodes them back to natural text.',
    },
    highlight: false,
  },
];
