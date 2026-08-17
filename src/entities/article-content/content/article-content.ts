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
      ko: [
        '사람이 검수한 한국어-영어 문장 약 7만 개를 분석한 결과, 한국어는 영어보다 평균적으로 더 많은 token을 사용하는 경향이 나타났다.',
        '같은 뜻을 담은 문장이라도, 언어에 따라 AI가 처리하는 단위의 수가 달라질 수 있다는 뜻이다.',
        '토큰화(Tokenization)는 인공지능이 인간의 지식을 해석하고 연산하는 가장 기초적인 물리적 단위이자 관문이다. 모델의 연산 시간, 기억할 수 있는 문맥(Context Window)의 한계, 그리고 API 호출량 산정까지 모든 핵심 제약이 바로 이 "몇 개의 토큰으로 쪼개졌는가"에서 결정된다.',
      ],
      en: [
        'An empirical analysis of approximately 70,000 human-verified Korean-English parallel sentences reveals that Korean consistently requires more tokens on average than English.',
        'This implies that even when expressing identical semantic intent, the physical computational units processed by the model diverge based on the writing system.',
        'Tokenization is the foundational computational gateway through which AI processes human knowledge. Sequence latency, context window limits, and API usage calculations are all governed by this single metric: token count.',
      ],
    },
    keyFinding: {
      bigNumber: { ko: '약 1.2× ~ 1.8×', en: '~1.2× – 1.8×' },
      label: { ko: '핵심 실측 관측치', en: 'Core Empirical Finding' },
      statement: {
        ko: '한·영 대응 문장 분석에서 한국어가 영어보다 더 많은 token을 사용하는 경향이 일관되게 나타났다.',
        en: 'Across parallel Korean-English sentence benchmarks, Korean consistently consumed more subword tokens than English.',
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
    preFigureParagraphs: {
      ko: [
        '문제는 동일하거나 유사한 의미를 전달하더라도 언어에 따라 token 수가 달라질 수 있다는 점이다. API 및 일부 생성형 AI 서비스에서는 token 수가 사용량과 비용 산정의 중요한 단위로 활용된다.',
        '그 차이는 모델이 답변을 만들기 전, 텍스트를 잘게 나누는 전처리 과정에서 시작된다.',
      ],
      en: [
        'The structural dilemma is that even when conveying equivalent semantics, token counts diverge significantly across languages. In APIs and developer platforms, token volume serves as the core metric for billing, rate limits, and compute consumption.',
        'This disparity originates before the model ever generates an answer—in the fundamental preprocessing step where raw text is segmented into tokens.',
      ],
    },
    figureNumber: 'FIG. 02',
    figureCaption: {
      ko: '생성형 AI 텍스트 처리 파이프라인: 원본 문자열에서 토큰 ID 벡터로의 변환',
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

  // S3 / 03: Mechanism - Why Hangul Fragments More
  mechanism: {
    status: 'draft',
    eyebrow: {
      ko: '03 / MECHANISM · 왜 한국어는 더 잘게 쪼개질까',
      en: '03 / MECHANISM · WHY HANGUL FRAGMENTS DEEPER',
    },
    headline: {
      ko: '왜 한국어는 더 잘게 쪼개질까',
      en: 'Why Does Hangul Fragment into Finer Subwords?',
    },
    lead: {
      ko: '영문 알파벳은 글자당 1바이트를 차지하며 단어 전체가 하나의 토큰으로 병합되는 반면, 한글은 3바이트 유니코드 구조와 형태소 결합 특성으로 인해 더 잘게 쪼개진다.',
      en: 'While English characters occupy 1 byte in ASCII and frequently merge into single-word tokens, Hangul syllables require 3 bytes in UTF-8 and diverse morphological affixes, causing deeper subword fragmentation.',
    },
    subheading: {
      ko: 'BPE 사전 내 빈도 편향과 바이트 단위 폴백',
      en: 'BPE Vocabulary Allocation Bias & Byte-Level Fallback',
    },
    preFigureParagraphs: {
      ko: [
        '최신 상용 토크나이저(o200k_base 등)는 약 10만~20만 개의 서브워드 사전을 보유하고 있습니다. 영어의 경우 빈번히 사용되는 대부분의 복합 단어와 관용구가 단 1개의 토큰으로 온전히 등록되어 있습니다.',
        '반면, 한국어는 11,172개의 완성형 음절과 다양한 조사·어미 결합 구조(교착어적 특성)로 인해 사전 내 단일 토큰으로 수록되지 못하고 2~4개의 작은 바이트 조각으로 파편화됩니다.',
        '이는 특정 언어의 결함이 아니라, 웹 크롤링 기반 학습 데이터에서 영문 텍스트가 절대 다수를 차지하여 BPE 알고리즘이 영문 서브워드에 압도적으로 많은 어휘 번호를 배정했기 때문입니다.',
      ],
      en: [
        'Modern commercial tokenizers maintain dictionaries of 100,000 to 200,000 subword entries. In English, common compound words and idiomatic phrases are assigned single, dedicated token IDs.',
        'In contrast, Korean—with 11,172 potential syllabic blocks and agglutinative particles—is frequently decomposed into multiple sub-syllabic byte fragments.',
        'This is not a defect in the language, but the mathematical outcome of BPE algorithms prioritizing high-frequency Latin strings present in predominantly English web crawl data.',
      ],
    },
    figureNumber: 'FIG. 03',
    figureCaption: {
      ko: '한글 음절 및 영문 단어의 바이트 분할과 서브워드 토큰 매핑 구조',
      en: 'Hangul Syllable & English Word Byte Slicing and Subword Token Mapping',
    },
    figureSource: {
      ko: '자료: OpenAI Tiktoken o200k_base 및 유니코드 표준 컨소시엄 UTF-8 사양',
      en: 'Source: OpenAI Tiktoken o200k_base & Unicode Consortium UTF-8 Specifications',
    },
    postFigureParagraphs: {
      ko: [
        '결과적으로 동일한 개념을 서술하더라도 한국어는 토크나이저 사전에 등록된 완성형 토큰을 찾지 못해 1~2바이트 단위의 잉여 조각으로 쪼개지는 "Byte Fallback" 현상이 더 자주 발생합니다.',
      ],
      en: [
        'Consequently, Hangul text more frequently encounters "Byte Fallback," where unseen syllable combinations are broken down into raw 1-to-2-byte sub-slices.',
      ],
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

  // S5 / 05: Corpus Analysis (69,432 Sentence Pairs & Domain Patterns)
  corpusAnalysis: {
    status: 'verified',
    eyebrow: {
      ko: '05 / CORPUS ANALYSIS · 한/영 말뭉치 69,432건 분석',
      en: '05 / CORPUS ANALYSIS · 69,432 SENTENCE PAIR BENCHMARK',
    },
    headline: {
      ko: '한/영 말뭉치 69,432건 분석',
      en: 'Corpus Analysis: 69,432 Verified KO-EN Sentence Pairs',
    },
    lead: {
      ko: '사람이 검수한 대규모 한·영 병렬 코퍼스 69,432건 및 1,012개 심층 벤치마크 문장쌍(o200k_base 기준)을 전수 분석하여 문체와 도메인별 Token Premium의 실증적 분포를 도출했습니다.',
      en: 'Analyzing a large-scale corpus of 69,432 human-reviewed KO-EN parallel sentences alongside a 1,012-pair deep benchmark under o200k_base to map empirical distributions across writing domains.',
    },
    preFigureParagraphs: {
      ko: [
        '분석 결과, 한국어와 영어의 token 차이는 문장 유형에 따라 동일하게 나타나지 않았다.',
        '일상적인 표현이나 구어체에서는 상대적 차이가 더 크게 나타났고(1.38×~1.83×), 영문 전문 용어가 빈번하거나 표준화된 법률·행정 문서에서는 상대적 편차가 완화되는 경향을 보였다.',
        '즉 Token Premium은 단일 고정 숫자로 설명되는 현상이라기보다, 문체와 어휘 구성 방식에 따라 1.29×에서 1.83×의 고유한 분포를 형성하는 현상이다.',
      ],
      en: [
        'The empirical results demonstrate that token disparity varies substantially across writing styles and domains.',
        'Colloquial speech and narrative dialogue exhibited higher relative gaps (1.38×–1.83×), whereas standardized legal or technical texts with borrowed terminology showed tempered ratios.',
        'Thus, Token Premium is not a monolithic single scalar, but an empirical distribution spanning from 1.29× to 1.83× depending on syntax and vocabulary.',
      ],
    },
    figureNumber: 'FIG. 04',
    figureCaption: {
      ko: '문장 유형 및 도메인별 Token Premium 분포 (Strip Distribution & IQR)',
      en: 'Domain Token Premium Ratio Distribution across Curated Benchmark Pairs',
    },
    figureSource: {
      ko: '출처: 병렬 벤치마크 코퍼스 1,012개 문장쌍 실측 (o200k_base 기준, 2026)',
      en: 'Source: Curated 1,012 parallel sentence benchmark pairs measured under o200k_base (2026)',
    },
    postFigureParagraphs: {
      ko: [
        '특히 장문의 고유명사와 정형화된 서식 비중이 높은 지식집약적 도메인일수록, 토큰 수의 절대적 격차가 누적되어 컨텍스트 윈도우 점유율에 실질적인 제약을 가져옵니다.',
      ],
      en: [
        'In knowledge-intensive domains requiring long-form reasoning, cumulative absolute token gaps place tangible constraints on usable context window capacity.',
      ],
    },
    keyFinding: {
      label: { ko: '도메인 분석 결론', en: 'Category Analysis Finding' },
      statement: {
        ko: '같은 한국어라도 문장의 유형과 도메인에 따라 Token Premium은 1.29×에서 1.83×까지 다양하게 나타납니다.',
        en: 'Even within Korean, Token Premium ranges dynamically from 1.29× to 1.83× depending on stylistic domain and vocabulary composition.',
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
        '아래 대화형 실험실에서 일상 대화, 비즈니스 보고서, 학술 논문, 공공 조례 등 4가지 대표적 문장쌍을 직접 비교해보십시오.',
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
        '같은 의미를 전달하더라도 두 문장이 반드시 같은 수의 token으로 표현되는 것은 아닙니다. 한글 문장은 평균 1.44배에서 1.83배에 이르는 토큰 조각으로 분절되어 모델에 입력됩니다.',
      ],
      en: [
        'Even when expressing equivalent information, sentences do not yield equal token counts. Korean sentences are segmented into 1.44× to 1.83× more subword fragments.',
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
      ko: '한 문장에서의 token 차이는 작아 보일 수 있다. 하지만 같은 종류의 AI 사용이 반복될수록 절대 token gap은 누적된다.',
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
        ko: '단일 프롬프트의 미세한 토큰 차이는 워크플로우가 반복될수록 기하급수적으로 누적되어 실질적인 연산 부담으로 전환됩니다.',
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
      ko: '표준 병렬 코퍼스(Flores-200)로 전수 측정한 12개 언어 효율성',
      en: '12-Language Efficiency Benchmark Measured via Flores-200 Parallel Corpus',
    },

    preFigureParagraphs: {
  ko: [
    'Flores-200 병렬 코퍼스를 기준으로 동일한 의미의 문장을 언어별로 비교하면, 언어에 따라 필요한 토큰 수에 차이가 나타난다. 영어의 토큰 소비량을 1.00으로 정규화했을 때 스페인어는 1.18배 수준으로 나타났다.',
    '반면 한글은 1.78배, 아랍어는 2.05배, 힌디어는 2.30배 수준으로 나타났다. 이는 동일한 정보를 처리하더라도 언어의 문자 체계와 토크나이저의 어휘 구성에 따라 필요한 토큰 수가 달라질 수 있음을 보여준다.',
  ],
  en: [
    'Benchmarking 12 major world language systems across the Flores-200 parallel corpus shows Latin-script languages like English (1.00×) and Spanish (1.18×) achieve dense compression.',
    'Conversely, non-Latin scripts such as Korean (1.78×), Arabic (2.05×), and Hindi (2.30×) experience severe token expansion due to underrepresentation in tokenizer vocabularies.',
  ],
},
    figureNumber: 'FIG. 06',
    figureCaption: {
      ko: 'Flores-200 병렬 코퍼스 기반 전 세계 12개 언어 토큰 분절 효율성 랭킹',
      en: 'Flores-200 Parallel Corpus: Global 12-Language Token Efficiency Ranking & Relative Ratios',
    },
    figureSource: {
      ko: '출처: Meta Flores-200 Multilingual Benchmark Evaluation (o200k_base Tokenizer, N=1,012)',
      en: 'Source: Meta Flores-200 Multilingual Benchmark Evaluation (o200k_base, N=1,012 Parallel Sentences)',
    },
    postFigureParagraphs: {
      ko: [
        '언어별 token representation efficiency의 차이는 한글만의 특수한 사례가 아니라, 다언어 AI 시스템 전체에서 살펴봐야 할 문제다.',
        '향후 다국어 AI 거버넌스와 소버린 파운데이션 모델 개발 시, 독자적인 고효율 어휘집(Custom Tokenizer) 구축이 왜 핵심 인프라 과제인지를 명확히 보여줍니다.',
      ],
      en: [
        'Token efficiency disparity is not a unique Korean edge case, but a systemic structural challenge across the entire multilingual AI ecosystem.',
        'It demonstrates why developing dedicated, linguistically balanced tokenizers is a strategic priority for sovereign AI and regional foundation models.',
      ],
    },
    keyFinding: {
      label: { ko: '글로벌 벤치마크 결론', en: 'Global Benchmark Takeaway' },
      statement: {
        ko: '비라틴계 문자 체계 전반에서 1.5×~2.3×의 토큰 팽창이 보편적으로 관측되며, 이는 다국어 AI 거버넌스의 구조적 과제입니다.',
        en: 'Token inflation of 1.5× to 2.3× is universally observed across non-Latin scripts, representing a structural challenge in global AI infrastructure.',
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
        '한국은 국가 차원의 대규모 AI 인프라 투자와 초거대 데이터센터 확충을 적극적으로 추진하고 있습니다. 정부의 AI 컴퓨팅 지원 사업과 민간 대기업의 차세대 반도체 투자는 향후 수년간 사회 전반의 AI 트래픽을 기하급수적으로 끌어올릴 것입니다.',
        '기존에 존재하던 언어별 분절 효율 격차가 사회 전체의 처리량 스케일과 결합하면서 경제적·운영적 중요성이 증폭된다는 사실이 중요합니다.',
      ],
      en: [
        'South Korea is accelerating national compute hubs and hyperscale AI data centers. National policies and private investments will drive exponential surges in daily AI token throughput.',
        'Crucially, when massive societal adoption meets pre-existing linguistic tokenization inefficiencies, the aggregate operational impact scales drastically.',
      ],
    },
    figureNumber: 'FIG. 07',
    figureCaption: {
      ko: '매크로 AI 도입 인과 사슬 및 검증된 정책·투자 데이터 슬롯 (Strict Data Verification)',
      en: 'Macro AI Adoption Causal Chain & Verified Policy/Investment Slots',
    },
    figureSource: {
      ko: '자료: 과학기술정보통신부 정책 공시 및 주요 AI 인프라 투자 공시 (2024–2026)',
      en: 'Source: Ministry of Science and ICT Official Releases & Major Investment Disclosures (2024–2026)',
    },
    postFigureParagraphs: {
      ko: [
        '공공 행정, 금융 거래, 대국민 복지 서비스 등 사회 전 영역에 AI 파이프라인이 직결되는 미래에는, 토큰 1개당 처리 단가의 미세한 차이가 국가 전체 컴퓨팅 전력 소모와 데이터센터 대역폭에 측정 가능한 영향을 미치게 됩니다.',
      ],
      en: [
        'As AI pipelines integrate directly into public administration and citizen services, minor per-token efficiency differentials translate into measurable differences in national compute power consumption.',
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
      ko: '언어 구조에서 사회적 파급 효과까지의 3단계 인과 사슬 (Complete Causal Chain)',
      en: 'Complete Causal Pathway: Language Structure → Tokenization → Token Premium → Workplace Burden → Digital Friction',
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
        ko: 'AI가 일상적 인프라가 될수록 언어별 representation efficiency를 측정하고 개선하는 문제는 디지털 형평성의 핵심 과제가 됩니다.',
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
        '본 프로젝트의 목적은 특정 언어의 우열을 가리거나 특정 AI 서비스를 비판하는 데 있지 않습니다. 오히려 표준화된 BPE 토큰화 알고리즘이 비라틴계 문자 체계에 미치는 물리적 영향력을 정량적으로 측정하고, 이를 독자들에게 명료하게 전달하는 데 있습니다.',
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
    lead: {
      ko: '“우리는 같은 의미를, 같은 비용으로 표현하고 있는가?”',
      en: '“Are We Expressing the Same Meaning, At the Same Computational Cost?”',
    },
    preFigureParagraphs: {
      ko: [
        '인공지능의 시대, 언어는 단지 인간의 소통 도구에 머무르지 않고 기계의 연산 자원을 점유하는 디지털 자산이 되었습니다.',
        '토크나이저 어휘집 속에 숨겨진 1.29× ~ 1.83×의 작은 분절 차이는 개인의 프롬프트 창을 넘어, 기업의 업무 프로세스와 국가 AI 인프라의 미래 효율성으로 이어집니다.',
        'AI가 사회의 보편적 인프라가 될수록, 언어별 representation efficiency를 측정하고 개선하는 문제는 디지털 형평성과 직결되는 핵심 과제가 될 것입니다.',
      ],
      en: [
        'In the generative AI era, human language is no longer just a medium of thought—it has become a digital asset governing machine compute allocations.',
        'The 1.29× to 1.83× token disparity embedded within tokenizer vocabularies scales from user prompts to enterprise workflows and sovereign infrastructure.',
        'As generative AI evolves into universal social infrastructure, measuring and optimizing multilingual representation efficiency becomes critical for digital equity.',
      ],
    },
  },
};
