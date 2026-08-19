/**
 * Moved unchanged from src/data/articleContent.ts. This is the single
 * highest-volume protected-research-copy file in the project (13
 * sections' lead/body/finding/footnote prose); it is relocated as one
 * file rather than split into 13 per-section files to eliminate any risk
 * of transcription error while moving protected wording/values (see
 * docs/CONTENT_AUDIT.md "Protected research copy").
 *
 * KNOWN FINDING (Phase 3): every section's `headline` field below is
 * currently unused by any widget except `hero.headline`, which
 * NewsHeroSection now consumes directly (see entities/article-content
 * PR notes). The other 12 `headline` values were compared against each
 * widget's actual rendered inline headline and found to DIFFER in
 * wording (not byte-identical duplicates) — they appear to be earlier
 * drafts that were never wired up. They are therefore left untouched
 * and unconsumed here rather than either (a) silently overwriting a
 * widget's real rendered headline with different text, or (b) deleting
 * research-adjacent drafted content without an editorial decision. See
 * the Phase 3 PR description for the full comparison table.
 */
import { ArticleContentRegistry } from '../model/types';

export const ARTICLE_CONTENT: ArticleContentRegistry = {
  // S0: Hero Section (Cover Spread)
  hero: {
    status: 'verified',
    eyebrow: {
      ko: 'TOKEN PREMIUM · AI × LANGUAGE / 2026',
      en: 'TOKEN PREMIUM · AI × LANGUAGE / 2026',
    },
    headline: {
      ko: '같은 질문,\n다른 청구서',
      en: 'Same Question,\nDifferent Bill',
    },
    subtitle: {
      ko: '한국어로 물으면 AI 이용료가 더 비싸지는 이유',
      en: 'Why Querying Generative AI in Korean Costs More Compute',
    },
    deck: {
      ko: '챗봇에게 같은 질문을 한국어와 영어로 각각 던졌다.\n질문의 내용은 같았지만, 그 답을 만드는 데 필요한 token 수는 달랐다.',
      en: 'We asked a chatbot the identical question in Korean and English.\nThe underlying semantic meaning was identical, but the number of tokens required to generate the response differed.',
    },
  },

  // S0.5 / 01: The Question Intro & Large Finding
  introTheQuestion: {
    status: 'verified',
    eyebrow: {
      ko: '01 / THE QUESTION · 문제의 출발점',
      en: '01 / THE QUESTION · EMPIRICAL ORIGIN',
    },
    headline: {
      ko: '같은 뜻을 담아도, AI가 읽는 길이는 다르다',
      en: 'Even with Identical Meaning, AI Reads in Different Lengths',
    },
    lead: {
      ko: '챗봇에게 똑같은 질문을 한국어와 영어로 각각 던졌다. 질문의 내용은 같았지만, 그 대답을 만드는 데 필요한 token 수는 달랐다.',
      en: 'We posed the exact same question to a large language model in Korean and English. While the questions conveyed identical intent, the subword token count required to process them varied substantially.',
    },
    preFigureParagraphs: {
      // Director redline (S00, 2026-08-17): "하단 설명은 2문단 이내로 압축" — the
      // former paragraphs 1+2 are merged into one (same two sentences, no
      // wording change), paragraph 3 (tokenization definition) stands alone
      // as the second. Compresses 3 paragraphs -> 2 without inventing text.
      ko: [
        '의미가 대응되는 한국어·영어 문장쌍 383만 쌍을 전부 세어보니, 열에 아홉 꼴로 한국어 쪽 토큰이 더 많았다. 같은 뜻을 담은 문장이라도 언어에 따라 AI가 처리하는 단위의 수가 달라진다는 뜻이다.',
        '토큰화(Tokenization)는 인공지능이 인간의 지식을 해석하고 연산하는 가장 기초적인 물리적 단위이자 관문이다. 모델의 연산 시간, 기억할 수 있는 문맥(Context Window)의 한계, 그리고 API 호출량 산정까지 모든 핵심 제약이 바로 이 "몇 개의 토큰으로 쪼개졌는가"에서 결정된다.',
      ],
      en: [
        'Counting all 3.84 million meaning-matched Korean-English sentence pairs, Korean used more tokens in roughly nine out of ten. Identical meaning, expressed in a different writing system, becomes a different number of units for the model to process.',
        'Tokenization is the foundational computational gateway through which AI processes human knowledge. Sequence latency, context window limits, and API usage calculations are all governed by this single metric: token count.',
      ],
    },
    keyFinding: {
      bigNumber: { ko: '1.33배', en: '1.33x' },
      label: { ko: '핵심 실측 관측치', en: 'Core Empirical Finding' },
      statement: {
        ko: '383만 쌍의 한·영 대응 문장에서 토큰 비율의 중앙값은 1.33배였다.',
        en: 'Across 3.84 million parallel Korean-English pairs, the median token ratio was 1.33x.',
      },
    },
    pullQuote: {
      ko: '“동일한 의미를 전달하는데, 왜 한국어 문장은 AI 신경망 안에서 더 잘게 쪼개져야 하는가?”',
      en: '“Why does expressing the exact same meaning require Hangul text to be fragmented into more subword tokens?”',
    },
  },

  // S2 / 02: Token as the New Metric Unit & Processing Pipeline
  tokenUnit: {
    status: 'verified',
    eyebrow: {
      ko: '02 / TOKEN · AI 시대의 새로운 계량 단위',
      en: '02 / TOKEN · THE COMPUTATIONAL CURRENCY OF AI',
    },
    headline: {
      ko: '토큰, AI 시대의 새로운 계량 단위',
      en: 'Tokens: The New Unit of Measurement in the AI Era',
    },
    lead: {
      ko: '생성형 AI 서비스는 문장을 글자 단위가 아니라 token이라는 작은 조각으로 처리한다. 문장을 더 많은 token으로 분절할수록 모델이 처리해야 하는 입력 시퀀스 역시 길어진다.',
      en: 'Generative AI processes natural language not character-by-character, but in subword fragments called tokens. Slicing sentences into more tokens lengthens the input sequence the neural network must compute.',
    },
    subheading: {
      ko: '문자열에서 토큰 ID 벡터로: AI 입력 파이프라인의 4단계',
      en: 'From Text to Token Vector: The 4-Stage Input Pipeline',
    },
    // Director redline (S02, 2026-08-17): "상단 설명은 한 단 줄이고" — merged
    // into one paragraph (identical sentences, no wording change) so the
    // section reads as didactic/instructional rather than editorial.
    preFigureParagraphs: {
      ko: [
        '문제는 동일하거나 유사한 의미를 전달하더라도 언어에 따라 token 수가 달라질 수 있다는 점이다. API 및 일부 생성형 AI 서비스에서는 token 수가 사용량과 비용 산정의 중요한 단위로 활용된다. 그 차이는 모델이 답변을 만들기 전, 텍스트를 잘게 나누는 전처리 과정에서 시작된다.',
      ],
      en: [
        'The structural dilemma is that even when conveying equivalent semantics, token counts diverge significantly across languages. In APIs and developer platforms, token volume serves as the core metric for billing, rate limits, and compute consumption. This disparity originates before the model ever generates an answer—in the fundamental preprocessing step where raw text is segmented into tokens.',
      ],
    },
    figureNumber: 'FIG. 02',
    figureCaption: {
      ko: '문장이 토큰으로 바뀌는 과정',
      en: 'Generative AI Input Pipeline: Text to UTF-8 Bytes, Subword Segmentation, and Token Vectors',
    },
    figureSource: {
      ko: '출처: BPE (Byte-Pair Encoding) 표준 아키텍처 및 LLM 입력 전처리 명세',
      en: 'Source: Byte-Pair Encoding Standard Architecture & LLM Preprocessing Specifications',
    },
    postFigureParagraphs: {
      ko: [
        'LLM의 입력 전처리는 [원본 문자열 입력] → [유니코드 UTF-8 바이트 인코딩] → [BPE 어휘집 대조] → [최종 토큰 ID 벡터 생성]의 과정을 거칩니다.',
        '이러한 분절 구조는 단순히 숫자가 늘어나는 데 그치지 않습니다. 트랜스포머 모델의 자기주의(Self-Attention) 연산량은 토큰 시퀀스 길이에 비례해 급증하므로, 한국어 문장의 토큰 수가 많다는 것은 모델이 같은 문장을 이해하기 위해 더 긴 거리의 상관관계를 연산해야 함을 뜻합니다.',
      ],
      en: [
        'LLM input preprocessing follows [Raw Text Input] → [UTF-8 Byte Encoding] → [BPE Vocabulary Lookup] → [Token ID Vector Generation].',
        'This fragmentation overhead does not merely inflate an integer counter. Transformer self-attention complexity scales with sequence length, meaning the neural network must compute pairwise attention matrices across a longer sequence to understand the same thought.',
      ],
    },
    keyFinding: {
      label: { ko: '아키텍처 인과 관계', en: 'Architectural Implication' },
      statement: {
        ko: '토큰 분절이 늘어날수록 입력 시퀀스가 길어져, 어텐션 연산량과 컨텍스트 윈도우 점유율이 동시에 증가합니다.',
        en: 'Increased token segmentation lengthens the sequence, simultaneously driving up attention compute overhead and context window consumption.',
      },
    },
  },

  // S3 / 03: Mechanism — why the ratio comes out above 1.
  //
  // REWRITTEN 2026-08-19 against the exact decomposition (TP = CR x BDR x CP).
  // The previous copy explained the premium as "Hangul is 3 bytes, so it costs
  // more tokens." The research report lists that exact sentence under 말할 수
  // 없음 — it is one of the study's named prohibited claims, and the data
  // contradicts it: Korean is SHORTER in characters in 99.67% of pairs, and
  // byte density and tokenizer compression are near-uncorrelated (Spearman
  // rho about -0.05), so they are two separate forces, not one.
  mechanism: {
    status: 'verified',
    eyebrow: {
      ko: '03 / 원인 · 왜 비율이 1을 넘는가',
      en: '03 / MECHANISM · WHY THE RATIO EXCEEDS 1',
    },
    headline: {
      ko: '글자는 더 적은데, 토큰은 더 많다',
      en: 'Fewer Characters, More Tokens',
    },
    lead: {
      ko: '한국어가 영어보다 토큰을 더 쓰는 이유를 흔히 "한글은 한 글자가 3바이트라서"로 설명한다. 전수 데이터는 그 설명이 맞지 않는다고 말한다.',
      en: 'The usual explanation is that a Hangul character takes three bytes, so Korean costs more tokens. The full-cohort data says that explanation does not hold.',
    },
    subheading: {
      ko: '세 단계로 나눠 보면 어디서 역전이 일어나는지 보인다',
      en: 'Split into three stages, the reversal becomes visible',
    },
    preFigureParagraphs: {
      ko: [
        '같은 뜻을 적을 때 한국어가 쓰는 글자 수는 영어의 0.47배다. 문장쌍의 99.67%에서 한국어 쪽이 더 짧았다. 글자만 세면 한국어가 이긴다.',
        '그런데 컴퓨터가 실제로 저장하는 용량으로 재면 순서가 뒤집힌다. 한글 한 글자가 영문자보다 무겁기 때문에, 글자 수와 글자당 용량을 함께 계산하면 한국어가 영어의 1.13배가 된다.',
        '여기서 끝이 아니다. 저장 용량이 같아도 토크나이저가 한국어를 더 잘게 나누는 몫이 중앙값 기준 1.19배 더 남아 있었다. 이 마지막 단계까지 더해져야 최종 토큰 비율 1.33배가 나온다.',
        '용량 부담과 분절 경향은 같은 힘이 아니다. 두 값의 상관계수는 -0.05로, 사실상 따로 움직였다. 한글이 무거워서 잘게 쪼개지는 것이 아니라, 무거운 것과 잘게 쪼개지는 것이 각각 별개로 작동한다는 뜻이다.',
      ],
      en: [
        'To write the same meaning, Korean uses 0.47 times as many characters as English. In 99.67% of pairs the Korean side was shorter. Count characters and Korean wins.',
        'Measure the storage a computer actually uses and the order flips. A Hangul character weighs more than a Latin letter, so once character count and per-character weight are combined, Korean comes to 1.13 times English.',
        'That is still not the whole gap. Even at equal storage size, the tokenizer split Korean into 1.19 times more pieces at the median. Only with this last stage does the final ratio of 1.33x appear.',
        'Storage weight and splitting behaviour are not the same force. Their correlation is about -0.05, meaning they moved almost independently. Korean is not fragmented because it is heavy; the weight and the fragmentation are two separate effects that happen to point the same way.',
      ],
    },
    figureNumber: 'FIG. 03',
    figureCaption: {
      ko: '글자 수, 저장 용량, 토큰 분절의 세 단계. 각 값은 서로 다른 중앙값이므로 곱해서 읽는 수치가 아니다.',
      en: 'Three stages: characters, storage size, and tokenizer splitting. Each figure is a separate median, so they are not meant to be multiplied.',
    },
    figureSource: {
      ko: '자료: 정확 분해 TP = 글자 수 비율 × 글자당 용량 비율 × 분절 비율 · KOEN EDA·분석 보고서 (2026-08-19)',
      en: 'Source: exact decomposition TP = code-point ratio x byte-density ratio x compression penalty · KOEN EDA report (2026-08-19)',
    },
    postFigureParagraphs: {
      ko: [
        '토크나이저 안을 한 단계 더 들여다보면 상식과 어긋나는 장면이 하나 더 나온다. 토크나이저는 문장을 먼저 큰 덩어리로 자른 뒤 각 덩어리를 다시 쪼개는데, 첫 단계에서 한국어 문장이 만들어내는 덩어리는 중앙값 11개로 영어의 15개보다 오히려 적다.',
        '역전은 두 번째 단계에서 일어난다. 한국어 덩어리 하나는 평균 2.02개의 토큰으로 쪼개지고, 영어 덩어리는 1.04개로 거의 쪼개지지 않는다. 그 결과 최종 토큰 수는 한국어 21개, 영어 16개로 뒤집힌다.',
        '즉 한국어가 처음부터 잘게 부서져 들어가는 것이 아니다. 큰 덩어리로 들어가서 안에서 부서진다.',
      ],
      en: [
        'Look one level deeper into the tokenizer and a second counter-intuitive scene appears. The tokenizer first cuts a sentence into coarse chunks, then splits each chunk further. At that first stage Korean produces a median of 11 chunks against English’s 15 — fewer, not more.',
        'The reversal happens at the second stage. Each Korean chunk breaks into about 2.02 tokens, while an English chunk breaks into 1.04 and mostly survives intact. The final counts flip: 21 tokens for Korean, 16 for English.',
        'Korean does not arrive pre-shredded. It arrives in larger pieces and comes apart inside.',
      ],
    },
    keyFinding: {
      label: { ko: '원인 분석 결론', en: 'Mechanism Finding' },
      statement: {
        ko: '한국어는 글자 수로는 더 짧다. 저장 용량과 토크나이저의 분절 방식이 그 이점을 상쇄하고도 남아 최종 비율이 1을 넘는다.',
        en: 'Korean is shorter in characters. Storage weight and tokenizer splitting more than cancel that advantage, which is why the final ratio exceeds 1.',
      },
    },
  },

  // S4 / 04: Beyond Korean (Short Narrative Preview)
  beyondKoreanPreview: {
    status: 'verified',
    eyebrow: {
      ko: '04 / BEYOND KOREAN · 한국어만의 이야기는 아니다',
      en: '04 / BEYOND KOREAN · A GLOBAL LINGUISTIC CHALLENGE',
    },
    headline: {
      ko: '한국어만의 이야기는 아니다',
      en: 'It Is Not Just a Korean Phenomenon',
    },
    lead: {
      ko: '한국어와 영어 사이의 차이는 더 넓은 다언어 token efficiency 문제의 한 사례일 수 있습니다. 뒤에서 전 세계 12개 주요 언어의 토큰 효율성을 함께 비교합니다.',
      en: 'The disparity between Korean and English is a single case study within a broader global token efficiency landscape across world languages.',
    },
    preFigureParagraphs: {
      ko: [
        '토큰화 불균형은 비라틴계 문자 체계를 사용하는 전 세계 모든 언어 공동체가 마주하고 있는 구조적 과제입니다.',
        '한자 표의문자를 사용하는 중국어·일본어, 아랍 문자, 데바나가리 문자를 사용하는 힌디어 등 각 문자 체계마다 AI 토크나이저 어휘집 배분에 따른 고유한 분절 패턴이 나타납니다.',
      ],
      en: [
        'Tokenization disparity is a structural phenomenon shared across non-Latin writing systems globally.',
        'From Chinese and Japanese Hanzi to Arabic abjads and Hindi Devanagari, distinct segmentation overheads emerge based on vocabulary allocation.',
      ],
    },
  },

  // S5 / 05: Corpus Analysis — full-cohort measurement of 3,835,988 KO-EN
  // sentence pairs. Every figure below resolves to entities/rq1-canonical;
  // see docs/audit/NUMERIC_CLAIMS.md for the artifact + hash of each one.
  corpusAnalysis: {
    status: 'verified',
    eyebrow: {
      ko: '05 / 전수 분석 · 한·영 문장쌍 383만 쌍',
      en: '05 / FULL-COHORT ANALYSIS · 3.84M KO-EN SENTENCE PAIRS',
    },
    headline: {
      ko: '문장쌍 3,835,988쌍을 전부 세어봤다',
      en: 'We Counted All 3,835,988 Sentence Pairs',
    },
    lead: {
      ko: '과학기술정보통신부와 한국지능정보사회진흥원이 운영하는 AI허브에서 의미가 대응되는 한국어·영어 문장쌍 3,835,988쌍을 받아, GPT-5가 쓰는 토크나이저로 하나씩 세어봤다.',
      en: 'We took 3,835,988 meaning-matched Korean-English sentence pairs from AI Hub, the national AI data platform run by Korea’s science ministry, and counted every one of them with the tokenizer GPT-5 uses.',
    },
    preFigureParagraphs: {
      ko: [
        '결론부터 말하면, 토큰 프리미엄은 존재했다. 한국어와 영어의 토큰 비율은 중앙값 1.33배였고, 문장쌍 열 개 중 아홉 개꼴인 87.99%에서 한국어 쪽 토큰이 더 많았다.',
        '다만 1.33배는 한국어가 전체적으로 토큰을 1.33배 쓴다는 뜻이 아니다. 383만 쌍을 비율 순으로 줄 세웠을 때 한가운데 있는 문장쌍의 값이다. 실제 격차는 문장마다 달랐다.',
        '아래쪽 25%가 시작되는 지점은 1.17배, 위쪽 25%가 시작되는 지점은 1.53배였다. 격차가 큰 1%로 넘어가는 경계는 2.25배다. 반대 방향도 있었다. 한국어가 오히려 토큰을 적게 쓴 문장쌍이 6.9%, 두 언어의 토큰 수가 정확히 같은 문장쌍이 5.1%였다.',
      ],
      en: [
        'The short answer is that the token premium is real. The median Korean-to-English token ratio was 1.33x, and in 87.99% of pairs — roughly nine in ten — Korean used more tokens.',
        'But 1.33x does not mean Korean uses 1.33 times as many tokens overall. Line up all 3.84 million pairs by ratio and it is the value of the one in the middle. The actual gap varied from sentence to sentence.',
        'The bottom quarter starts at 1.17x and the top quarter at 1.53x. The boundary into the widest 1% sits at 2.25x. The gap also ran the other way: in 6.9% of pairs Korean used fewer tokens, and in 5.1% the two languages came out exactly even.',
      ],
    },
    figureNumber: 'FIG. 04',
    figureCaption: {
      ko: '383만 쌍의 토큰 비율. 중앙값과 백분위 경계, 그리고 어느 쪽 토큰이 더 많았는지를 함께 놓았다.',
      en: 'Token ratios across 3.84 million pairs — the median, the percentile boundaries, and which language used more.',
    },
    figureSource: {
      ko: '자료: AI허브 한·영 병렬 말뭉치 3,835,988쌍 전수 측정 (o200k_base, 원문 텍스트 기준) · NB08_RQ1_RESULTS_v001',
      en: 'Source: full-cohort measurement of 3,835,988 AI Hub KO-EN pairs (o200k_base, raw text) · NB08_RQ1_RESULTS_v001',
    },
    postFigureParagraphs: {
      ko: [
        '이 중앙값이 얼마나 단단한지 확인하려고 383만 쌍에서 표본을 2,000번 다시 뽑아 계산해봤다. 95% 신뢰구간은 1.3333배에서 1.3333배, 폭이 0으로 나왔다.',
        '정밀도가 높아서가 아니다. 토큰 수는 정수이므로 두 정수의 비율은 1/1, 5/4, 4/3, 3/2 같은 몇 개의 분수 위에만 놓인다. 383만 쌍이 만들어낸 서로 다른 값은 3,725개뿐이고, 그중 정확히 4/3인 문장쌍만 123,040개다. 중앙값이 이 두꺼운 층 한가운데 박혀 있어서 표본을 다시 뽑아도 값이 움직이지 않는다.',
        '말뭉치를 출처별로 갈라보면 중앙값도 갈린다. 025 말뭉치는 1.32배, 026 말뭉치는 1.36배였고, 전체 중앙값 1.33배는 그 어느 쪽과도 일치하지 않는다. 다만 출처를 나눠 다시 계산한 신뢰구간도 전체와 같았고, 방향이 뒤집히지는 않았다.',
        '분야별로도 나눠봤지만 여기서는 비율을 내지 않기로 했다. 대화와 일반은 025에만, 기술은 026에만 들어 있고 두 출처가 함께 가진 분야는 기타 하나뿐이다. 이 상태에서는 기술 문서라서 비율이 높은 것인지 026 말뭉치라서 높은 것인지 갈라낼 방법이 없다. 그래서 분야는 구성 비율만 싣는다.',
      ],
      en: [
        'To see how firm that median is, we resampled the 3.84 million pairs 2,000 times. The 95% confidence interval came back as 1.3333x to 1.3333x — zero width.',
        'That is not precision. Token counts are whole numbers, so the ratio of two of them can only land on a handful of fractions: 1/1, 5/4, 4/3, 3/2. Across 3.84 million pairs there are only 3,725 distinct values, and 123,040 pairs sit exactly on 4/3. The median is lodged in the middle of that thick layer, so resampling never moves it.',
        'Split the corpus by source and the median splits too. The 025 corpus gives 1.32x, the 026 corpus 1.36x, and the pooled 1.33x matches neither. The interval recomputed with sources held separate was identical to the pooled one, and the direction did not reverse.',
        'We also split by subject area, but we are not publishing ratios for it. Dialogue and general text appear only in 025, technology only in 026, and the one subject both sources share is "other". There is no way to tell apart "the ratio is higher because it is technical writing" from "the ratio is higher because it is the 026 corpus." So the subject breakdown here shows composition only.',
      ],
    },
    keyFinding: {
      label: { ko: '전수 분석 결론', en: 'Full-Cohort Finding' },
      statement: {
        ko: '한국어와 영어의 토큰 비율은 중앙값 1.33배였고, 383만 쌍의 87.99%에서 한국어 쪽 토큰이 더 많았다.',
        en: 'The median Korean-to-English token ratio was 1.33x, and Korean used more tokens in 87.99% of the 3.84 million pairs.',
      },
    },
  },

  // S6 / 06: Real Sentences (Quick Compare Interactive Lab)
  realSentences: {
    status: 'verified',
    eyebrow: {
      ko: '06 / REAL SENTENCES · 실제 문장으로 알아보자',
      en: '06 / REAL SENTENCES · CURATED SENTENCE LAB',
    },
    headline: {
      ko: '실제 문장으로 알아보자',
      en: 'Examining Real Sentence Pairs',
    },
    lead: {
      ko: '통계보다 직관적인 것은 실제 문장이다. 같은 의미를 담은 한국어와 영어 문장을 나란히 놓고 보면, AI가 두 문장을 어떤 token으로 나누는지 직접 확인할 수 있다.',
      en: 'More intuitive than abstract statistics is examining real sentences side-by-side. Observe how the tokenizer dissects semantically equivalent Korean and English expressions.',
    },
    preFigureParagraphs: {
      ko: [
        '검증된 한국어-영어 대응 문장을 선택하면, 실제 tokenizer가 두 문장을 어떻게 나누는지 확인할 수 있습니다.',
        '아래 대화형 실험실에서 일상 대화, 비즈니스 보고서, 학술 논문, 공공 조례 등 4가지 대표적 문장쌍을 직접 비교한다.',
      ],
      en: [
        'By selecting curated, cross-verified sentence pairs, you can inspect the exact subword boundaries applied by frontier tokenizers.',
        'Explore the interactive lab below across everyday conversation, corporate reporting, scientific research, and municipal bylaws.',
      ],
    },
    figureNumber: 'FIG. 01',
    figureCaption: {
      ko: '교차 검증된 동일 의미 문장쌍의 토큰 분절 조각 및 상대 비율 비교',
      en: 'Verified Semantic Sentence Pairs: Subword Token Fragmentation & Relative Count Comparison',
    },
    figureSource: {
      ko: '출처: OpenAI o200k_base Tokenizer 및 큐레이션된 한·영 병렬 코퍼스 벤치마크 (2026)',
      en: 'Source: OpenAI o200k_base Tokenizer & Curated Parallel Corpus Benchmark (2026)',
    },
    postFigureParagraphs: {
      ko: [
        '같은 뜻을 담아도 두 문장이 같은 수의 토큰이 되지는 않는다. 아래 문장쌍은 383만 쌍 가운데 유형별로 고른 사례이고, 전체 분포의 중앙값은 1.33배다. 문장마다 값은 달라진다.',
      ],
      en: [
        'Equivalent meaning does not produce equivalent token counts. The pairs below are illustrative examples drawn by type from the 3.84 million; across the full cohort the median ratio is 1.33x, and it varies pair by pair.',
      ],
    },
  },

  // S7 / 07: Accumulated Burden & Receipt Simulation
  accumulatedBurden: {
    status: 'verified',
    eyebrow: {
      ko: '07 / ACCUMULATED BURDEN · 이 차이는 얼마나 누적될까',
      en: '07 / ACCUMULATED BURDEN · WORKPLACE COMPOUNDING',
    },
    headline: {
      ko: '그래서 이 차이는 얼마나 누적될까',
      en: 'How Does This Discrepancy Compound Over Time?',
    },
    lead: {
      ko: '한 문장에서의 token 차이는 작아 보일 수 있다. 하지만 같은 종류의 AI 사용이 반복될수록 토큰 격차는 그대로 누적된다.',
      en: 'A token discrepancy in a single prompt may seem minor. However, as high-frequency AI workflows repeat, the absolute token gap compounds systematically.',
    },
    subheading: {
      ko: '반복 횟수와 직무 특성에 따른 누적 토큰 청구서(Token Receipt)',
      en: 'Cumulative Token Receipt: Workflow Repetitions & Occupational Exposure',
    },
    preFigureParagraphs: {
      ko: [
        '개인이 일상에서 몇 번 질문을 던질 때의 수십 개 토큰 차이는 체감하기 어려울 수 있습니다. 하지만 하루 수백 건의 고객 문의를 처리하는 기업의 AI 상담 봇, 수만 페이지의 공공 보고서를 요약하는 지식 노동자 환경에서는 이 격차가 수백만 토큰의 누적 연산 부담으로 전환됩니다.',
        '슬라이더를 움직여 동일한 질문 세트를 1회에서 100회까지 반복했을 때 한국어와 영어 간에 발생하는 절대 토큰 격차(Absolute Gap)의 누적 추이를 확인해보십시오.',
      ],
      en: [
        'For an individual asking a few questions, a delta of tens of tokens is negligible. But in enterprise customer support agents handling thousands of tickets daily, or policy analysts digesting massive reports, this gap scales into millions of cumulative tokens.',
        'Adjust the repetition slider below to observe how the absolute token gap compounds from 1 to 100 workflow cycles.',
      ],
    },
    figureNumber: 'FIG. 05',
    figureCaption: {
      ko: '반복 사용 횟수에 따른 한·영 누적 토큰 청구서 (Monochrome Token Receipt)',
      en: 'Cumulative Token Receipt by Workflow Repetition Count (Korean vs. English)',
    },
    figureSource: {
      ko: '자료: 큐레이션된 병렬 문장쌍 기준 누적 연산 시뮬레이션 모델 (2026)',
      en: 'Source: Cumulative Token Burden Analytical Simulation Model (2026)',
    },
    postFigureParagraphs: {
      ko: [
        '단 100회의 반복만으로도 700~1,500개 이상의 절대 토큰 차이가 발생합니다. 이는 고정된 컨텍스트 윈도우 환경에서 참조할 수 있는 문서의 길이를 줄이고, 모델의 처리 지연 시간(Latency)을 가중시킵니다.',
      ],
      en: [
        'In just 100 iterations, an absolute gap of 700 to 1,500+ tokens accumulates. In fixed context window environments, this reduces available reference capacity and increases inference latency.',
      ],
    },
    keyFinding: {
      label: { ko: '누적 분석 시사점', en: 'Compounding Insight' },
      statement: {
        ko: '단일 프롬프트의 미세한 토큰 차이는 워크플로우가 반복될수록 그대로 누적되어 실질적인 연산 부담으로 전환됩니다.',
        en: 'Minor prompt-level token discrepancies compound into substantial absolute computational loads as workflows repeat.',
      },
    },
  },

  // S4.5: Global Multilingual Token Efficiency (Positioned between S4 and S5)
  multilingualBenchmark: {
    status: 'verified',
    eyebrow: {
      ko: '04.5 / GLOBAL TOKEN EFFICIENCY · 다른 언어는 어떨까?',
      en: '04.5 / GLOBAL TOKEN EFFICIENCY · WORLD LANGUAGES BENCHMARK',
    },
    headline: {
      ko: '그렇다면, 다른 언어는 어떨까?',
      en: 'What About Other World Languages?',
    },
    lead: {
      ko:  '이러한 토큰 효율의 차이는 한국어와 영어에만 국한되지 않는다. 같은 정보를 표현하더라도 언어의 문자 체계와 토크나이저의 어휘집 구성에 따라 AI가 처리하는 토큰의 양은 크게 달라질 수 있다.',
      en: 'Is this disparity unique to Korean and English? Even when communicating identical information, the sequence length processed by AI varies dramatically across world writing systems.',
    },
    subheading: {
      ko: '선행연구가 FLORES-200으로 측정한 언어별 토큰 사용량',
      en: 'Token use by language, as measured on FLORES-200 by prior research',
    },

    // Director redline (S04.5, 2026-08-17): merged 2 paragraphs into 1
    // (identical sentences, no wording change) as part of demoting the
    // pre-chart text toward caption weight ("chart must win first read").
    //
    // Human Preview 01 continuation (2026-08-18, Vice Director crawl
    // verdict S45-M02): the per-language figures this paragraph used to
    // cite (Spanish 1.18x, Korean 1.78x, Arabic 2.05x, Hindi 2.30x) were
    // MULTILINGUAL_COMPARISON_DATA's values, rendered by the chart that
    // used to sit directly below this text. That chart was removed this
    // iteration (it coexisted with the new Petrov exhibit and rendered a
    // second, differently-sourced Korean ratio in the same section).
    // Removing the chart without also editing this paragraph would leave
    // specific per-language numbers on the page with no supporting
    // visual, so they are trimmed to the general (unnumbered) trend
    // claim here. This also incidentally removes the "Hindi"/"12개 언어"
    // wording already flagged BLOCKED_CONTENT_AUTHORITY under
    // HP01-S4.5-R02 -- not re-litigated, just no longer restated.
    preFigureParagraphs: {
  ko: [
    'Flores-200 병렬 코퍼스를 기준으로 동일한 의미의 문장을 언어별로 비교하면, 언어에 따라 필요한 토큰 수에 차이가 나타난다. 로마자 계열 언어는 상대적으로 적은 토큰을 사용한 반면, 비라틴 문자 체계는 더 많은 토큰을 필요로 하는 경향이 나타났다.',
  ],
  en: [
    'Benchmarking world language systems across the Flores-200 parallel corpus shows that Latin-script languages tend to use fewer tokens, while non-Latin scripts tend to require more, due to underrepresentation in tokenizer vocabularies.',
  ],
},
    figureNumber: 'FIG. 06',
    figureCaption: {
      ko: '영어를 1.00배로 뒀을 때의 언어별 토큰 사용 비율 (cl100k_base 기준)',
      en: 'Tokens used per language relative to English at 1.00x (cl100k_base)',
    },
    figureSource: {
      ko: '출처: Petrov, La Malfa, Torr & Bibi (2023), NeurIPS · FLORES-200 병렬문장 2,000개, cl100k_base',
      en: 'Source: Petrov, La Malfa, Torr & Bibi (2023), NeurIPS · FLORES-200, 2,000 parallel sentences, cl100k_base',
    },
    postFigureParagraphs: {
      ko: [
        '언어별 토큰 표현 효율의 차이는 한글만의 특수한 사례가 아니라, 다언어 AI 시스템 전체에서 살펴봐야 할 문제다.',
      ],
      en: [
        'Token efficiency disparity is not a unique Korean edge case, but a systemic structural challenge across the entire multilingual AI ecosystem.',
      ],
    },
    keyFinding: {
      label: { ko: '글로벌 벤치마크 결론', en: 'Global Benchmark Takeaway' },
      statement: {
        ko: '선행연구에서 한국어보다 격차가 더 큰 언어도 관측됐다. 한글만의 문제가 아니라는 뜻이다.',
        en: 'The prior study observed languages with a wider gap than Korean — this is not a Hangul-specific problem.',
      },
    },
  },

  // S8 / 08: Beyond Cost - Socioeconomic Impact & Korea Infrastructure Scale
  koreaInfrastructure: {
    status: 'verified',
    eyebrow: {
      ko: '08 / INFRASTRUCTURE SCALE · 한국 AI 생태계의 스케일업',
      en: "08 / INFRASTRUCTURE SCALE · KOREA'S EXPANDING AI ECOSYSTEM",
    },
    headline: {
      ko: '국가 AI 인프라 확장이 낳는 거시적 파급력',
      en: 'Macro Implications of Expanding National AI Infrastructure',
    },
    lead: {
      ko: '국가 AI 컴퓨팅 센터 구축, 첨단 HBM 반도체 투자, 기업의 전사적 에이전트 도입. AI가 사회의 기간 인프라가 될 때, 토큰 분절 효율성은 거시적 영역으로 확대됩니다.',
      en: "As national AI compute hubs, sovereign AI, and enterprise-wide rollouts expand, linguistic token efficiency scales into a systemic consideration.",
    },
    preFigureParagraphs: {
      ko: [
        '한국은 국가 차원의 대규모 AI 인프라 투자와 초거대 데이터센터 확충을 적극적으로 추진하고 있습니다. 정부의 AI 컴퓨팅 지원 사업과 민간 대기업의 차세대 반도체 투자는 향후 수년간 사회 전반의 AI 트래픽을 지속적으로 끌어올릴 것으로 보입니다.',
        '기존에 존재하던 언어별 분절 효율 격차가 사회 전체의 처리량 스케일과 결합하면서 경제적·운영적 중요성이 증폭된다는 사실이 중요합니다.',
      ],
      en: [
        'South Korea is accelerating national compute hubs and hyperscale AI data centers. National policies and private investments are expected to keep driving up daily AI token throughput.',
        'Crucially, when massive societal adoption meets pre-existing linguistic tokenization inefficiencies, the aggregate operational impact scales drastically.',
      ],
    },
    figureNumber: 'FIG. 07',
    figureCaption: {
      ko: '한국 AI 인프라 확산의 4단계 흐름',
      en: "Korea's AI Infrastructure Adoption Timeline",
    },
    figureSource: {
      ko: '자료: 과학기술정보통신부 정책 공시 및 주요 AI 인프라 투자 공시 (2024–2026)',
      en: 'Source: Ministry of Science and ICT Official Releases & Major Investment Disclosures (2024–2026)',
    },
    postFigureParagraphs: {
      ko: [
        '공공 행정, 금융 거래, 대국민 복지 서비스 등 사회 전 영역에 AI 파이프라인이 직결되는 미래에는, 토큰 1개당 처리 단가의 미세한 차이도 국가 전체 컴퓨팅 자원 배분에서 함께 고려해야 할 변수가 됩니다.',
      ],
      en: [
        'As AI pipelines integrate directly into public administration and citizen services, even minor per-token efficiency differences become a factor worth weighing in national compute resource planning.',
      ],
    },
  },

  // S8.2 / 08.2: Socioeconomic Impact & 3-Tier Progression (From Me to Society)
  socioeconomicScale: {
    status: 'verified',
    eyebrow: {
      ko: '08 / IMPACT · 비용을 넘어선 문제 (3단계 확장 경로)',
      en: '08 / IMPACT · BEYOND COST: SOCIOECONOMIC SCALE-UP',
    },
    headline: {
      ko: '비용을 넘어선 문제',
      en: 'A Challenge Beyond API Billing',
    },
    lead: {
      ko: 'Token Premium이 존재하고, 서비스의 사용량·한도·비용이 token 단위와 연결되는 환경에서는 언어별 token efficiency 차이가 실제 이용 경험과 디지털 형평성의 차이로 이어질 가능성이 있습니다.',
      en: 'Where service limits, context ceilings, and compute costs are tied to token volume, linguistic token efficiency differentials can translate into tangible variations in user experience and digital equity.',
    },
    subheading: {
      ko: '01 개인 → 02 조직/기업 → 03 사회: 3단계 누적 확장 프레임워크',
      en: '01 Personal → 02 Work / Organization → 03 Society: 3-Stage Progression',
    },
    preFigureParagraphs: {
      ko: [
        '서비스가 token 기반의 사용량 제한을 두는 경우, 동일한 의미를 더 많은 token으로 표현하는 사용자는 같은 양의 대화를 하더라도 한도에 더 빨리 접근할 가능성이 있습니다.',
        '토큰 프리미엄의 영향은 개인의 프롬프트 분할(01단계)에서 시작하여, 조직의 장문 문맥 분석과 고빈도 에이전트 루프(02단계)를 거쳐, 국가의 기간 인프라와 공공 데이터센터 대역폭(03단계)으로 점차 확장됩니다.',
      ],
      en: [
        'When platforms impose token-based rate limits or context caps, users expressing thoughts in higher-token scripts may reach usage ceilings faster for equivalent conversational depth.',
        'The impact compounds across three distinct tiers: Level 01 (Personal) subword prompt splits, Level 02 (Work/Organization) long-context agent loops, and Level 03 (Society) essential public infrastructure.',
      ],
    },
    figureNumber: 'FIG. 08',
    figureCaption: {
      ko: '언어 구조에서 사회적 파급 효과까지, 가능한 확장 경로',
      en: 'From Language Structure to Societal Impact: A Possible Expansion Pathway',
    },
    figureSource: {
      ko: '출처: 토큰 프리미엄 데이터 저널리즘 연구팀 개념 모델링 (2026)',
      en: 'Source: Token Premium Research Conceptual Framework (2026)',
    },
    postFigureParagraphs: {
      ko: [
        '이를 극복하기 위해서는 글로벌 모델에 대한 수동적 의존을 넘어, 한국어 음절과 형태소 결합 특성을 반영하는 고효율 토크나이저 연구, 다국어 어휘집 확장 표준 제정, 그리고 국가 차원의 소버린 AI 생태계 조성이 긴요합니다.',
      ],
      en: [
        'Overcoming this friction requires investing in dedicated Hangul-optimized tokenizers, expanding multilingual vocabulary allocations in foundation models, and nurturing sovereign compute ecosystems designed for linguistic equity.',
      ],
    },
    keyFinding: {
      label: { ko: '사회적 시사점', en: 'Societal Implication' },
      statement: {
        ko: 'AI가 일상적 인프라가 될수록 언어별 표현 효율성을 측정하고 개선하는 문제는 디지털 형평성의 핵심 과제가 됩니다.',
        en: 'As generative AI becomes societal infrastructure, measuring and optimizing linguistic representation efficiency becomes a fundamental digital equity priority.',
      },
    },
  },

  // S9 / 09: Methodology & Scientific Boundaries
  methodologyBoundaries: {
    status: 'verified',
    eyebrow: {
      ko: '09 / METHODOLOGY · 연구 방법론 및 과학적 경계',
      en: '09 / METHODOLOGY · SCIENTIFIC BOUNDARIES & LIMITATIONS',
    },
    headline: {
      ko: '연구 방법론 및 6대 경계 원칙',
      en: 'Methodology & 6 Core Boundary Principles',
    },
    lead: {
      ko: '데이터 저널리즘의 투명성과 학술적 엄밀성을 위해, 본 인터랙티브 스토리의 분석 기준, 토크나이저 의존성, 표본 한계 및 6대 "주장하지 않는 원칙"을 투명하게 공개합니다.',
      en: 'For scientific rigor and transparency, we disclose benchmark premises, tokenizer dependencies, sampling scope, and 6 core "What We Do NOT Claim" boundary principles.',
    },
    preFigureParagraphs: {
      ko: [
        '본 프로젝트의 목적은 특정 언어의 우열을 가리거나 특정 AI 서비스를 비판하는 데 있지 않습니다. 오히려 표준화된 BPE(Byte Pair Encoding, 자주 등장하는 글자 조합을 하나의 토큰으로 묶어나가는 하위 단어 분절 방식) 토큰화 알고리즘이 비라틴계 문자 체계에 미치는 물리적 영향력을 정량적으로 측정하고, 이를 독자들에게 명료하게 전달하는 데 있습니다.',
        '과도한 비약이나 오해를 방지하기 위해, 본 연구가 명시적으로 "주장하지 않는" 6가지 경계 원칙을 명시합니다.',
      ],
      en: [
        'The objective of this investigation is neither to rank languages nor critique specific AI vendors. Rather, it quantitatively measures how standard BPE tokenization algorithms interact with non-Latin scripts.',
        'To prevent misinterpretation, we establish 6 explicit scientific boundary principles outlining what our empirical analysis does not claim.',
      ],
    },
    postFigureParagraphs: {
      ko: [
        '모든 실측 데이터는 OpenAI o200k_base 토크나이저 및 Meta Flores-200 병렬 코퍼스를 기준으로 산출되었으며, 향후 모델 개발사의 어휘집 업데이트나 새로운 토크나이저 아키텍처 도입에 따라 수치가 변동될 수 있습니다.',
      ],
      en: [
        'All empirical metrics were evaluated under the OpenAI o200k_base tokenizer and Meta Flores-200 parallel corpus, and may evolve with future tokenizer vocabulary updates.',
      ],
    },
    footnotes: {
      ko: [
        '1. 토큰 수는 사용된 토크나이저 아키텍처 및 어휘집(Vocabulary) 크기에 따라 달라질 수 있습니다.',
        '2. 본 분석의 직무별 누적 연산 모델은 대표적 워크플로우를 가정한 개념적 시뮬레이션입니다.',
        '3. Flores-200 벤치마크는 위키피디아 기반의 번역 코퍼스로, 일상 구어체와 일부 차이가 있을 수 있습니다.',
      ],
      en: [
        '1. Token counts depend strictly on tokenizer vocabulary allocation and versioning.',
        '2. Occupational burden modeling is an analytical simulation based on typical knowledge workflows.',
        '3. Flores-200 parallel benchmark is derived from formal articles and may differ slightly from colloquial speech.',
      ],
    },
  },

  // S10 / 10: Conclusion Synthesis
  conclusionSynthesis: {
    status: 'draft',
    eyebrow: {
      ko: '10 / RESULT · 결언 (EDITORIAL CONCLUSION)',
      en: '10 / RESULT · SYNTHESIS (EDITORIAL CONCLUSION)',
    },
    headline: {
      ko: '같은 의미는,\n같은 길이가 아니었다',
      en: 'Same Meaning Was Not,\nEqual in Length',
    },
    // Director redline (S07, 2026-08-17): the H2 (hardcoded in
    // EditorialConclusionSection.tsx) already carries the question — this
    // `lead` used to restate it verbatim as a quote directly underneath,
    // which read as repetition rather than reinforcement ("반복이 아니라
    // 논지의 정련"). Replaced with the previously-unused `headline` field
    // above (reformatted from a two-line heading fragment into one
    // declarative sentence) — reusing an already-drafted, on-topic
    // editorial line rather than inventing new copy.
    lead: {
      ko: '같은 의미는, 같은 길이가 아니었습니다.',
      en: 'Same meaning was not equal in length.',
    },
    preFigureParagraphs: {
      // Director redline (S07): paragraph count/length trimmed for
      // closing-slide breathing room. Former paragraphs 1+2 merged
      // (identical sentences, no wording change); former paragraph 3
      // stands alone. The 1.29x-1.83x range that stood here was replaced by
      // the canonical median 1.33x under the D1 ruling of 2026-08-19.
      //
      // Human Preview 01 iteration 11 (HP01-S7-R01/B01): paragraph 2's
      // embedded English rhetorical phrase Koreanized (no meaning
      // change). Added paragraph 3 — compacts the closing to
      // measured/observed/not-yet-claimed per the DOM Master's own
      // instruction, restating (not adding to) two boundaries already
      // approved on-site in WHAT_WE_DO_NOT_CLAIM (methodology.ts,
      // items 2 and 6: not "always more costly", not "confirmed
      // socioeconomic inequality cause"). No new claim, no new number.
      ko: [
        '한국어와 영어의 토큰 비율은 383만 쌍의 중앙값 기준 1.33배였다. 문장 하나로 보면 토큰 몇 개 차이지만, 토큰이 비용과 문맥과 사용 한도를 나누는 단위로 쓰이는 한 이 차이는 개인의 프롬프트 창을 넘어 조직의 업무와 국가 인프라의 처리량까지 따라간다.',
        'AI가 사회의 보편적 인프라가 될수록, 언어별 표현 효율성을 측정하고 개선하는 문제는 디지털 형평성과 직결되는 핵심 과제가 될 것입니다.',
        '다만 이는 특정 토크나이저와 표본에서 관측된 구조적 격차이며, 모든 상황에서 더 많은 비용이 든다거나 확정적인 사회경제적 불평등의 원인이라고 단정하는 것은 아닙니다.',
      ],
      en: [
        'Across 3.84 million pairs the median Korean-to-English token ratio was 1.33x. In a single sentence that is a handful of tokens. But as long as tokens are the unit that meters cost, context and usage limits, the gap follows the text from a personal prompt window through an organisation’s workflows to national infrastructure throughput.',
        'As generative AI evolves into universal social infrastructure, measuring and optimizing multilingual representation efficiency becomes critical for digital equity.',
        'This reflects a structural gap observed within a specific tokenizer and sample—it does not assert that Korean always costs more, or confirm this as a settled cause of socioeconomic inequality.',
      ],
    },
  },
};
