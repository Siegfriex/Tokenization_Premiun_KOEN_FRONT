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
      ko: 'AI는 문장을 글자 하나하나로 읽지 않는다. 토큰이라는 조각으로 잘라서 읽는다. 조각이 많아질수록 모델이 훑어야 하는 줄도 길어진다.',
      en: 'AI does not read a sentence letter by letter. It cuts the sentence into pieces called tokens and reads those. The more pieces, the longer the sequence the model has to work through.',
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
        '같은 뜻을 담아도 언어에 따라 조각 수가 달라진다는 것이 문제다. 개발자용 API를 비롯한 여러 서비스가 이 조각 수를 기준으로 사용량과 요금을 매긴다. 차이는 모델이 답을 만들기 전, 문장을 자르는 단계에서 이미 생긴다.',
      ],
      en: [
        'The problem is that the same meaning yields a different number of pieces depending on the language. Developer APIs and several consumer services meter usage and billing by that count. The gap opens before the model writes a single word of its answer, at the step where the sentence is cut up.',
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
        '문장은 입력된 그대로 저장 형식으로 바뀌고, 토크나이저가 가진 사전과 대조되어 조각으로 나뉜 뒤, 각 조각에 붙은 번호의 목록이 되어 모델에 들어간다.',
        '조각 수가 늘어나면 숫자만 커지는 것이 아니다. 모델은 문장을 이해할 때 조각끼리 서로 얼마나 관련 있는지를 전부 따져보는데, 이 계산량은 조각 수가 늘어나는 속도보다 훨씬 가파르게 늘어난다. 조각이 두 배가 되면 따져야 할 짝은 네 배에 가까워진다.',
      ],
      en: [
        'The sentence is converted to its storage form, matched against the tokenizer’s dictionary to be cut into pieces, and handed to the model as a list of the numbers attached to those pieces.',
        'More pieces is not just a bigger number. To understand a sentence the model weighs how much every piece relates to every other one, and that work grows far faster than the piece count itself. Double the pieces and the pairs to weigh roughly quadruple.',
      ],
    },
    keyFinding: {
      label: { ko: '아키텍처 인과 관계', en: 'Architectural Implication' },
      statement: {
        ko: '조각이 많아질수록 모델이 훑을 줄이 길어지고, 계산량과 한 번에 담을 수 있는 분량이 함께 압박을 받는다.',
        en: 'More pieces means a longer sequence to work through, squeezing both the computation and how much can be held at once.',
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
      ko: '한국어와 영어 사이의 차이는 더 넓은 문제의 한 사례일 수 있다. 뒤에서 다른 언어들의 사정도 함께 살펴본다.',
      en: 'The Korean-English gap may be one case of something broader. We look at how other languages fare later on.',
    },
    preFigureParagraphs: {
      ko: [
        '토큰 수의 불균형은 로마자를 쓰지 않는 언어 공동체가 공통으로 마주한 문제다.',
        '한자를 쓰는 중국어와 일본어, 아랍 문자, 데바나가리 문자를 쓰는 힌디어까지, 문자 체계마다 토크나이저 사전에 배정된 자리가 다르고 그만큼 잘리는 방식도 달라진다.',
      ],
      en: [
        'Uneven token counts are a problem shared by language communities that do not write in the Latin alphabet.',
        'From Chinese and Japanese characters to the Arabic script and Hindi’s Devanagari, each writing system gets a different share of the tokenizer’s dictionary, and is cut up differently as a result.',
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
        '문장쌍을 하나 고르면 토크나이저가 두 문장을 각각 어디서 잘랐는지 조각 단위로 볼 수 있다.',
        '일상 대화, 업무 보고, 학술 문장, 공공 문서 네 갈래의 문장쌍을 실었다.',
      ],
      en: [
        'Pick a pair and you can see exactly where the tokenizer cut each sentence, piece by piece.',
        'Four kinds of writing are included: everyday conversation, workplace reporting, academic prose, and public documents.',
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
        '질문 몇 번에 토큰 몇 개 차이는 아무도 체감하지 못한다. 하지만 하루에 수백 건의 문의를 받는 상담 봇이나, 긴 보고서를 종일 요약하는 업무라면 같은 차이가 계속 쌓인다.',
        '아래 슬라이더로 같은 작업을 1회에서 100회까지 반복했을 때 토큰 격차가 어떻게 누적되는지 볼 수 있다. 실제 사용 기록이 아니라, 한 번의 차이를 그대로 곱한 산술 예시다.',
      ],
      en: [
        'A few tokens across a few questions is beneath anyone’s notice. But a support bot fielding hundreds of tickets a day, or a job spent summarising long reports, repeats that same difference over and over.',
        'The slider below runs the same task from 1 to 100 times and shows how the gap accumulates. It is arithmetic on a single measured difference, not a record of real usage.',
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
        '한 번에 7개씩 벌어지는 차이도 100번 반복하면 700개가 된다. 한 번에 담을 수 있는 분량이 정해져 있는 환경에서는, 그만큼 함께 넣을 수 있는 자료가 줄어든다.',
      ],
      en: [
        'A gap of seven tokens per run becomes 700 across a hundred runs. Where the amount that fits at once is fixed, that is reference material you can no longer include.',
      ],
    },
    keyFinding: {
      label: { ko: '누적 분석 시사점', en: 'Compounding Insight' },
      statement: {
        ko: '한 번에는 사소한 차이도, 같은 작업이 반복되면 그대로 쌓인다.',
        en: 'Trivial once, the same difference simply accumulates when the work repeats.',
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
    // NOT CONSUMED. S4.5 renders FLORES_CITATION_NOTE's own figure metadata,
    // because that exhibit cites a different corpus and tokenizer and is kept
    // structurally separate. These three fields describe the project's own
    // 12-language chart, removed in PR #32. Left in place rather than deleted
    // so the record of what the section used to show survives; corrected in
    // this pass so they do not read as a live description of the page.
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
      ko: 'AI가 몇몇 사람의 도구가 아니라 사회가 함께 쓰는 설비가 되면, 문장 하나에서 생긴 토큰 차이도 사회 전체가 처리하는 양에 실린다.',
      en: 'Once AI becomes shared infrastructure rather than an individual tool, a token gap measured in single sentences rides on everything a society processes.',
    },
    preFigureParagraphs: {
      ko: [
        '한국은 국가 차원의 AI 인프라 투자와 데이터센터 확충을 진행하고 있다. 정부의 컴퓨팅 지원 사업과 민간의 반도체 투자가 이어지면서, 앞으로 몇 년간 사회가 주고받는 AI 처리량은 계속 늘어날 것으로 보인다.',
        '토큰 차이 자체가 커지는 것은 아니다. 다만 같은 차이가 훨씬 많은 처리량에 곱해진다.',
      ],
      en: [
        'Korea is building out national compute capacity and data centres. With public compute programmes and private chip investment both continuing, the volume of AI processing the country does is set to keep rising for years.',
        'The gap itself does not grow. It is simply multiplied against a far larger volume.',
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
        '행정과 금융, 복지 서비스까지 AI가 직접 연결되는 단계에 이르면, 토큰 한 개당 처리 비용의 작은 차이도 자원을 어떻게 나눌지 정할 때 함께 놓고 봐야 할 항목이 된다.',
      ],
      en: [
        'Once AI is wired directly into administration, finance and public services, even a small per-token difference becomes one of the items to weigh when deciding how compute gets allocated.',
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
      ko: '토큰이 사용량과 한도와 요금을 나누는 단위로 쓰이는 한, 언어에 따른 토큰 차이는 실제로 쓸 수 있는 양의 차이로 옮겨갈 수 있다.',
      en: 'As long as tokens are the unit that meters usage, limits and cost, a token gap between languages can become a gap in how much you actually get to use.',
    },
    subheading: {
      ko: '01 개인 → 02 조직/기업 → 03 사회: 3단계 누적 확장 프레임워크',
      en: '01 Personal → 02 Work / Organization → 03 Society: 3-Stage Progression',
    },
    preFigureParagraphs: {
      ko: [
        '토큰으로 사용량을 제한하는 서비스라면, 같은 뜻을 더 많은 토큰으로 표현하는 쪽이 같은 분량의 대화를 하고도 한도에 먼저 닿을 수 있다.',
        '이 차이는 개인이 쓰는 프롬프트 창에서 시작해, 긴 문서를 다루는 조직의 업무를 거쳐, 국가가 감당하는 처리량까지 같은 방향으로 따라간다.',
      ],
      en: [
        'Where a service caps usage by tokens, whoever needs more tokens for the same meaning can hit that cap sooner at the same depth of conversation.',
        'The difference travels in one direction: from an individual’s prompt window, through the long-document work an organisation does, to the volume a country has to carry.',
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
        '해법의 방향은 대체로 세 갈래로 모인다. 한국어 구조를 반영한 토크나이저를 직접 연구하는 것, 모델 개발사가 다국어에 배정하는 사전 자리를 늘리도록 요구하는 것, 그리고 그 판단을 남에게 맡기지 않을 만큼의 자체 역량을 갖추는 것이다.',
      ],
      en: [
        'Responses tend to converge on three: research tokenizers built around Korean’s own structure, press model developers to widen the dictionary space given to non-English languages, and hold enough capacity domestically that the choice is not made entirely elsewhere.',
      ],
    },
    keyFinding: {
      label: { ko: '사회적 시사점', en: 'Societal Implication' },
      statement: {
        ko: 'AI가 일상의 설비가 될수록, 언어마다 다른 표현 효율을 재고 좁히는 일은 기술 문제에 머무르지 않는다.',
        en: 'The more AI becomes everyday infrastructure, the less this stays a purely technical question.',
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
      ko: '이 기사가 무엇을 어떻게 쟀는지, 그리고 이 데이터로 말할 수 없는 것이 무엇인지 밝혀둔다.',
      en: 'What we measured, how we measured it, and what this data cannot be used to say.',
    },
    preFigureParagraphs: {
      ko: [
        '이 기사는 어느 언어가 더 나은지를 가리려는 것이 아니고, 특정 서비스를 겨냥한 것도 아니다. 토크나이저가 문장을 자르는 방식이 로마자를 쓰지 않는 언어에 어떤 결과를 남기는지를 재본 것이다.',
        '자주 붙어 다니는 글자 조합을 하나의 조각으로 묶어나가는 방식을 BPE라고 부른다. 이 기사에서 말하는 조각은 모두 그렇게 만들어진 단위다.',
        '측정한 것보다 더 많은 것을 말하지 않기 위해, 이 데이터로 주장하지 않는 것들을 아래에 적어둔다.',
      ],
      en: [
        'This piece is not an attempt to rank languages, nor is it aimed at any particular service. It measures what a tokenizer’s way of cutting sentences leaves behind for languages that are not written in the Latin alphabet.',
        'The method that repeatedly merges frequently co-occurring character sequences into single pieces is called BPE. Every "piece" in this article is a unit produced that way.',
        'So that nothing is claimed beyond what was measured, what this data does not support is set out below.',
      ],
    },
    postFigureParagraphs: {
      ko: [
        '이 기사의 측정값은 모두 o200k_base 토크나이저와 AI허브 한·영 병렬 말뭉치를 기준으로 한 것이다. 다른 언어와의 비교에 인용한 수치는 다른 연구가 다른 토크나이저로 잰 것이므로 같은 자에 놓고 볼 수 없다. 모델 개발사가 사전을 손보면 값은 달라진다.',
      ],
      en: [
        'Every measurement in this article was made with the o200k_base tokenizer on the AI Hub Korean-English parallel corpus. The cross-language figures come from separate research using a different tokenizer and cannot be placed on the same scale. If a vendor revises its dictionary, the numbers move.',
      ],
    },
    footnotes: {
      ko: [
        '1. 토큰 수는 어떤 토크나이저를 쓰느냐에 따라 달라진다. 이 기사의 값은 o200k_base 기준이다.',
        '2. 누적 시뮬레이션은 실제 사용 기록이 아니라, 한 번의 차이를 반복 횟수만큼 곱한 산술 예시다.',
        '3. 다른 언어와의 비교는 Petrov 외(2023)가 cl100k_base로 측정한 값을 인용한 것이고, 이 기사의 측정과 직접 비교할 수 없다.',
        '4. 분야별 토큰 비율은 싣지 않았다. 말뭉치에서 분야와 출처가 엇갈려 있어 둘을 갈라낼 수 없기 때문이다.',
      ],
      en: [
        '1. Token counts depend on which tokenizer is used. Every figure here is o200k_base.',
        '2. The cumulative simulation is arithmetic on a single measured difference, not a record of real usage.',
        '3. The cross-language comparison quotes Petrov et al. (2023), measured with cl100k_base, and is not directly comparable to our own measurement.',
        '4. No per-subject token ratios are published. Subject area and source corpus do not cross cleanly enough to tell the two apart.',
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
        '실제 청구액, 무료 요금제의 한도, 응답의 품질, 그리고 그것이 사회에 남기는 격차까지는 각각 따로 확인해야 할 문제다. 이 기사가 할 수 있는 일은 그 논의가 시작될 지점을 383만 쌍의 문장으로 짚어두는 데 있다.',
        '이 격차는 한국어가 본래 비효율적인 언어라는 뜻이 아니다. 특정 토크나이저와 특정 말뭉치에서 관측된 결과이고, 언제나 더 비싸다거나 사회적 불평등의 확인된 원인이라고 말할 수 있는 단계도 아니다.',
      ],
      en: [
        'Across 3.84 million pairs the median Korean-to-English token ratio was 1.33x. In a single sentence that is a handful of tokens. But as long as tokens are the unit that meters cost, context and usage limits, the gap follows the text from a personal prompt window through an organisation’s workflows to national infrastructure throughput.',
        'Actual bills, free-tier limits, answer quality, and whatever any of it leaves behind socially are each separate questions to settle separately. What this article can do is mark where that conversation starts, using 3.84 million sentence pairs.',
        'The gap does not mean Korean is an inefficient language. It is what one tokenizer did to one corpus, and it is not yet grounds for saying Korean always costs more, or that this is a confirmed cause of social inequality.',
      ],
    },
  },
};
