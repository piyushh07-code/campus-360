import React, { useState } from 'react';
import { StudyAiService, isAiBackendConfigured } from '../../services/ai/studyAiService';
import { AiStudyResponse } from '../../types';

export const AiAssistantPage: React.FC = () => {
  const [subject, setSubject] = useState('DAA');
  const [topic, setTopic] = useState('Merge Sort');
  const [userQuestion, setUserQuestion] = useState('');
  const [mode, setMode] = useState<'explain' | 'quiz' | 'flashcards' | 'example'>('explain');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiStudyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Quiz interactive state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Flashcards state
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleAsk = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setSubmittedQuiz(false);
    setSelectedAnswers({});
    setFlippedCards({});

    try {
      const response = await StudyAiService.askAssistant({
        subject,
        topic,
        mode,
        userQuestion,
      });
      setResult(response);
    } catch {
      setError('Failed to generate response. Please try again or inspect connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run initial query on mount if no result
  React.useEffect(() => {
    handleAsk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const toggleFlip = (cardIndex: number) => {
    setFlippedCards((prev) => ({ ...prev, [cardIndex]: !prev[cardIndex] }));
  };

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Page Title & AI Engine Status Ribbon */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
              Cognitive Academic Intelligence
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">
              {isAiBackendConfigured() ? 'Live Model Stream' : 'Curated Educational Engine'}
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            SmartStudy AI Assistant
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Query curriculum topics for rigorous theoretical decompositions, formula proofs, flashcards, and exam quizzes.
          </p>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setSubject('DAA');
              setTopic('Merge Sort');
              setUserQuestion('Derive recurrence relation and space complexity bounds');
            }}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant font-medium transition-colors"
          >
            DAA: Merge Sort
          </button>
          <button
            onClick={() => {
              setSubject('OS');
              setTopic('Virtual Memory');
              setUserQuestion('Explain TLB hit ratio and Page Fault interrupt handling');
            }}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant font-medium transition-colors"
          >
            OS: Virtual Memory
          </button>
          <button
            onClick={() => {
              setSubject('DBMS');
              setTopic('B+ Tree Indexing');
              setUserQuestion('Why is B+ Tree preferred over B Tree in relational databases?');
            }}
            className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-xs text-on-surface-variant font-medium transition-colors"
          >
            DBMS: B+ Trees
          </button>
        </div>
      </div>

      {/* Query Formulation Form */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-border-neutral">
        <form onSubmit={handleAsk} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-main-text mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-medium focus:outline-none"
              >
                <option value="DAA">DAA (Algorithms)</option>
                <option value="OS">OS (Operating Systems)</option>
                <option value="BioEng 204">BioEng 204 (Biomedical)</option>
                <option value="DBMS">DBMS (Database Systems)</option>
                <option value="Computer Networks">Computer Networks</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-main-text mb-1">Topic / Invariant *</label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Merge Sort, Semaphores, Normalization"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-main-text mb-1">
                Specific Question or Focus Area (Optional)
              </label>
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="e.g. Derive recurrence proof or compare edge cases"
                className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Mode Pill Bar & Generate Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border-neutral/60">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
              <button
                type="button"
                onClick={() => setMode('explain')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  mode === 'explain'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Deep Concept Breakdown
              </button>
              <button
                type="button"
                onClick={() => setMode('quiz')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  mode === 'quiz'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Interactive Quiz
              </button>
              <button
                type="button"
                onClick={() => setMode('flashcards')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  mode === 'flashcards'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Flashcards Flip
              </button>
              <button
                type="button"
                onClick={() => setMode('example')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  mode === 'example'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Practical Example
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#2F6FED] hover:bg-[#2056C2] text-white font-semibold text-xs shadow-sm transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  <span>Generate Explanation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-error-container text-on-error-container flex items-center justify-between border border-error/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-error">error</span>
            <span className="text-xs font-medium">{error}</span>
          </div>
          <button
            onClick={() => handleAsk()}
            className="px-3 py-1 rounded bg-white text-error text-xs font-semibold hover:bg-gray-100"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state skeleton */}
      {isLoading && (
        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-border-neutral flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-headline-sm text-base font-semibold text-main-text">
            Consulting Academic Syllabus Matrix...
          </span>
          <p className="text-xs text-secondary-text text-center max-w-sm">
            Synthesizing core invariants, algorithmic proofs, and exam preparation benchmarks for "{topic}".
          </p>
        </div>
      )}

      {/* AI Structured Results View */}
      {result && !isLoading && (
        <div className="space-y-6">
          {/* Main Theoretical Breakdown Card */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">psychology</span>
                <h2 className="font-headline-md text-xl font-bold text-main-text">
                  Theoretical Deconstruction: {topic}
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary text-xs font-semibold">
                {subject}
              </span>
            </div>

            <p className="font-body-md text-sm text-main-text leading-relaxed mb-6">
              {result.overview}
            </p>

            {/* Key Concepts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {result.keyConcepts?.map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-surface-container-low border border-border-neutral/60 flex flex-col gap-2"
                >
                  <span className="text-xs font-bold text-main-text">{c.title}</span>
                  <p className="text-xs text-secondary-text leading-relaxed">{c.explanation}</p>
                </div>
              ))}
            </div>

            {/* Code / Formula Representation */}
            {result.codeOrFormula && (
              <div className="mb-6">
                <span className="font-label-sm text-xs font-semibold text-outline uppercase tracking-wider block mb-2">
                  Computational / Mathematical Formulation:
                </span>
                <pre className="p-4 rounded-xl bg-[#111C2C] text-gray-200 font-mono text-xs overflow-x-auto leading-relaxed border border-border-neutral/30">
                  <code>{result.codeOrFormula}</code>
                </pre>
              </div>
            )}

            {/* Practical Example */}
            {result.practicalExample && (
              <div className="p-4 rounded-xl bg-warm-surface border border-border-neutral/60">
                <span className="text-xs font-bold text-main-text block mb-1">
                  Practical Real-World Application:
                </span>
                <p className="text-xs text-secondary-text leading-relaxed">{result.practicalExample}</p>
              </div>
            )}
          </div>

          {/* Flashcards View */}
          {result.flashcards && result.flashcards.length > 0 && (
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#138A72] text-[22px]">style</span>
                  <h2 className="font-headline-sm text-lg font-bold text-main-text">
                    Curriculum Flashcards ({result.flashcards.length})
                  </h2>
                </div>
                <span className="text-xs text-secondary-text">Click a card to reveal answer</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {result.flashcards.map((card, i) => (
                  <div
                    key={i}
                    onClick={() => toggleFlip(i)}
                    className="min-h-[140px] p-4 rounded-xl border border-border-neutral bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex flex-col justify-between shadow-xs select-none"
                  >
                    <div className="flex items-center justify-between text-[10px] text-outline uppercase font-semibold">
                      <span>Card #{i + 1}</span>
                      <span className="text-primary">{flippedCards[i] ? 'Answer' : 'Question'}</span>
                    </div>

                    <p className="text-xs font-medium text-main-text text-center my-3 leading-relaxed">
                      {flippedCards[i] ? card.back : card.front}
                    </p>

                    <div className="text-[10px] text-center text-outline">
                      {flippedCards[i] ? 'Click to show question' : 'Click to flip answer'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Quiz View */}
          {result.quizQuestions && result.quizQuestions.length > 0 && (
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-neutral">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">quiz</span>
                  <h2 className="font-headline-sm text-lg font-bold text-main-text">
                    Midterm Self-Assessment Quiz
                  </h2>
                </div>
                <span className="text-xs text-secondary font-semibold">
                  {Object.keys(selectedAnswers).length} of {result.quizQuestions.length} Answered
                </span>
              </div>

              <div className="space-y-6">
                {result.quizQuestions.map((q, qIndex) => {
                  const isSelected = selectedAnswers[qIndex] !== undefined;
                  const isCorrect = selectedAnswers[qIndex] === q.correctIndex;

                  return (
                    <div
                      key={qIndex}
                      className="p-4 rounded-xl bg-surface-container-low/60 border border-border-neutral/60 flex flex-col gap-3"
                    >
                      <span className="text-xs font-bold text-main-text">
                        {qIndex + 1}. {q.question}
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIndex) => {
                          const chosen = selectedAnswers[qIndex] === optIndex;
                          let btnStyle = 'bg-white border-border-neutral text-main-text hover:bg-gray-50';

                          if (submittedQuiz) {
                            if (optIndex === q.correctIndex) {
                              btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-semibold';
                            } else if (chosen) {
                              btnStyle = 'bg-red-100 border-red-300 text-red-900';
                            }
                          } else if (chosen) {
                            btnStyle = 'bg-primary-container text-white border-primary font-semibold';
                          }

                          return (
                            <button
                              key={optIndex}
                              type="button"
                              onClick={() => handleSelectOption(qIndex, optIndex)}
                              className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {submittedQuiz && optIndex === q.correctIndex && (
                                <span className="material-symbols-outlined text-[16px] text-emerald-700">
                                  check_circle
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {submittedQuiz && (
                        <div
                          className={`p-2.5 rounded-lg text-xs mt-1 ${
                            isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                          }`}
                        >
                          <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end pt-2">
                  {!submittedQuiz ? (
                    <button
                      type="button"
                      onClick={() => setSubmittedQuiz(true)}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
                    >
                      Submit Quiz Answers
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedQuiz(false);
                        setSelectedAnswers({});
                      }}
                      className="px-5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-main-text text-xs font-semibold"
                    >
                      Reset Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
