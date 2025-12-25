import React, { useState, useEffect, useRef } from 'react';
import { Moon, Heart } from 'lucide-react';

export default function AnniversaryExperience() {
  const [stage, setStage] = useState('opening');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealedLayer, setRevealedLayer] = useState(null);
  const [showTransition, setShowTransition] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stillTime, setStillTime] = useState(0);
  const [showBeginButton, setShowBeginButton] = useState(false);
  const lastMoveTime = useRef(Date.now());

  const questions = [
    {
      id: 'distance',
      text: 'when the distance feels heavy\nwhat do you reach for',
      choices: [
        { 
          text: 'memories of us together', 
          layer: 'trust',
          response: 'you hold what we have built\nlike it is enough to carry you\n\nit is'
        },
        { 
          text: 'the thought of next time', 
          layer: 'patience',
          response: 'you live in tomorrows\nbecause today feels too far\n\ni understand'
        },
        { 
          text: 'nothing - i just sit with it', 
          layer: 'vulnerability',
          response: 'you let it hurt\nwithout trying to fix it\n\nthis is the bravest thing'
        }
      ]
    },
    {
      id: 'night',
      text: 'on nights when you cannot sleep\nwhat keeps you awake',
      choices: [
        { 
          text: 'wondering if this is enough', 
          layer: 'fear',
          response: 'the question sits with you\nlike an uninvited guest\n\nbut you are still here\nso maybe you already know'
        },
        { 
          text: 'missing the small things', 
          layer: 'softness',
          response: 'not the big moments\njust the quiet ones\n\nthis is how i miss you too'
        },
        { 
          text: 'nothing specific - just a feeling', 
          layer: 'presence',
          response: 'some nights just feel like you\neven when you are not thinking of me\n\ni hope mine feel like you too'
        }
      ]
    },
    {
      id: 'forget',
      text: 'when you forget something i remember\nhow does it feel',
      choices: [
        { 
          text: 'guilty, like i should have remembered', 
          layer: 'dependence',
          response: 'you do not have to remember everything\nthat is what i am here for\n\nnot keeping score\njust keeping you'
        },
        { 
          text: 'grateful you remember for me', 
          layer: 'acceptance',
          response: 'this is what we do\nyou hold some things\ni hold others\n\nneither of us carrying it alone'
        },
        { 
          text: 'like i am being taken care of', 
          layer: 'safety',
          response: 'you are\n\nnot because you need it\nbut because i want to',
          surprise: true
        }
      ]
    },
    {
      id: 'choice',
      text: 'if you could change one thing about us\nwhat would you choose',
      choices: [
        { 
          text: 'the distance', 
          layer: 'honest',
          response: 'of course you would\nanyone would\n\nbut you choose me anyway\neven with the weight of it'
        },
        { 
          text: 'nothing - i would choose this again', 
          layer: 'commitment',
          response: 'not because it is easy\nbut because it is us\n\nthis is the answer i carry with me\nevery single day'
        },
        { 
          text: 'i do not know anymore', 
          layer: 'tired',
          response: 'some days the answer is not clear\nand that is okay\n\ni am not asking you to be sure\njust to still be here'
        }
      ]
    },
    {
      id: 'final',
      text: 'after six years\nwhy are you still here',
      choices: [
        { 
          text: 'because i love you', 
          layer: 'simple',
          response: 'the simplest answer\nand the truest one\n\nthank you for staying'
        },
        { 
          text: 'because you never made me choose', 
          layer: 'freedom',
          response: 'i never wanted you to shrink your life\nto fit inside mine\n\nloving you means\nletting you be whole'
        },
        { 
          text: 'because it still feels like home', 
          layer: 'home',
          response: 'even across timezones\neven through screens\neven in silence\n\nyou have always been the place\ni return to\n\nand i hope i am yours too'
        }
      ]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      lastMoveTime.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);

    const stillTimer = setInterval(() => {
      const timeSinceMove = Date.now() - lastMoveTime.current;
      if (timeSinceMove > 1000) {
        setStillTime(prev => prev + 100);
      }
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(stillTimer);
    };
  }, []);

  useEffect(() => {
    if (stage === 'opening') {
      setTimeout(() => setFadeIn(true), 500);
      setTimeout(() => setShowBeginButton(true), 3000);
    }
  }, [stage]);

  const handleChoice = (choiceIndex) => {
    const question = questions[currentQuestion];
    const choice = question.choices[choiceIndex];
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: { choice: choiceIndex, layer: choice.layer }
    }));

    setRevealedLayer(choice);
    setShowTransition(true);

    setTimeout(() => {
      setShowTransition(false);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setRevealedLayer(null);
        setFadeIn(false);
        setTimeout(() => setFadeIn(true), 100);
      } else {
        setStage('closing');
        setFadeIn(false);
        setTimeout(() => setFadeIn(true), 100);
      }
    }, choice.surprise ? 8000 : 5000);
  };

  const startExperience = () => {
    setStage('questions');
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 100);
  };

  const grainBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

  if (stage === 'opening') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 flex items-center justify-center px-6 relative overflow-hidden">
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-repeat" style={{ backgroundImage: grainBg }} />

        <div 
          className="fixed w-96 h-96 rounded-full blur-3xl opacity-5 transition-all duration-1000 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #f5deb3 0%, transparent 70%)',
            left: mousePos.x - 192 + 'px',
            top: mousePos.y - 192 + 'px',
          }}
        />

        <div className={`text-center space-y-12 transition-all duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative inline-block">
            <Moon className="w-16 h-16 text-amber-100 opacity-30" />
            <div className="absolute inset-0 blur-xl bg-amber-100 opacity-10" />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-extralight tracking-wider text-slate-400">
              six years
            </h1>
            
            {stillTime > 2000 && (
              <p className="text-xs text-slate-600 tracking-wide animate-[fadeIn_2s_ease-in_forwards] opacity-0">
                this is not a celebration
                <br />this is a conversation
              </p>
            )}
          </div>

          {showBeginButton && (
            <button
              onClick={startExperience}
              className="group relative px-8 py-3 text-sm text-slate-500 transition-all duration-700 hover:text-slate-400 animate-[fadeIn_2s_ease-in_forwards] opacity-0"
            >
              <div className="absolute inset-0 border border-slate-800 group-hover:border-slate-700 transition-colors duration-700" />
              <span className="relative">begin</span>
            </button>
          )}

          {!showBeginButton && stillTime > 1000 && (
            <p className="text-xs text-slate-700 italic animate-[fadeIn_1s_ease-in_forwards]">
              wait
            </p>
          )}
        </div>
      </div>
    );
  }

  if (stage === 'questions') {
    const question = questions[currentQuestion];

    if (showTransition && revealedLayer) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 flex items-center justify-center px-6 relative overflow-hidden">
          <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-repeat" style={{ backgroundImage: grainBg }} />

          <div className="max-w-xl text-center space-y-12 animate-[fadeIn_1s_ease-in_forwards]">
            <div className="space-y-8">
              <p className="text-lg font-light leading-relaxed whitespace-pre-line text-slate-400">
                {revealedLayer.response}
              </p>
            </div>

            {revealedLayer.surprise && stillTime > 3000 && (
              <div className="pt-8 animate-[fadeIn_3s_ease-in_forwards] opacity-0">
                <div className="inline-block relative group">
                  <div className="absolute inset-0 bg-amber-200 opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-700" />
                  <div className="relative px-6 py-4 border border-slate-800 bg-slate-900/50">
                    <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
                      i made something for you
                      <br />but you will only see it once
                      <br />
                      <br />
                      <span className="text-slate-600 italic text-[10px]">
                        imagine a voice note here that says:
                        <br />you do not need to be perfect.
                        <br />you just need to be here.
                        <br />and you are.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 flex items-center justify-center px-6 relative overflow-hidden">
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-repeat" style={{ backgroundImage: grainBg }} />

        <div 
          className="fixed w-96 h-96 rounded-full blur-3xl opacity-5 transition-all duration-1000 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #f5deb3 0%, transparent 70%)',
            left: mousePos.x - 192 + 'px',
            top: mousePos.y - 192 + 'px',
          }}
        />

        <div className={`max-w-2xl w-full space-y-16 transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center space-y-8">
            <div className="inline-block px-2 py-1 text-[10px] tracking-widest text-slate-700 border border-slate-900">
              {currentQuestion + 1} / {questions.length}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-light leading-relaxed whitespace-pre-line text-slate-400">
              {question.text}
            </h2>
          </div>

          <div className="space-y-4">
            {question.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className="group relative w-full text-left px-8 py-6 transition-all duration-700 hover:translate-x-2"
              >
                <div className="absolute inset-0 border border-slate-800 group-hover:border-slate-700 group-hover:bg-slate-900/30 transition-all duration-700" />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 blur-xl transition-all duration-700" />
                <p className="relative text-sm md:text-base text-slate-500 group-hover:text-slate-400 transition-colors duration-700">
                  {choice.text}
                </p>
              </button>
            ))}
          </div>

          {stillTime > 3000 && (
            <p className="text-center text-xs text-slate-700 italic animate-[fadeIn_2s_ease-in_forwards] opacity-0">
              there is no wrong answer
            </p>
          )}
        </div>
      </div>
    );
  }

  if (stage === 'closing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 flex items-center justify-center px-6 relative overflow-hidden">
        <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-repeat" style={{ backgroundImage: grainBg }} />

        <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-5 animate-pulse" />

        <div className={`max-w-xl text-center space-y-16 transition-all duration-2000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="space-y-8">
            <p className="text-xl font-light leading-relaxed text-slate-400 whitespace-pre-line">
              this was not made to impress you
              <br />
              <br />it was made to sit with you
            </p>

            {stillTime > 2000 && (
              <div className="space-y-6 pt-8 animate-[fadeIn_3s_ease-in_forwards] opacity-0">
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
                
                <p className="text-sm text-slate-500 leading-loose whitespace-pre-line">
                  six years
                  <br />and i still choose us
                  <br />every single day
                </p>
              </div>
            )}

            {stillTime > 5000 && (
              <div className="pt-8 animate-[fadeIn_4s_ease-in_forwards] opacity-0">
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line italic">
                  i will still be here tomorrow
                  <br />living my night
                  <br />while you live your day
                  <br />
                  <br />but we are still in the same story
                </p>
              </div>
            )}
          </div>

          {stillTime > 8000 && (
            <div className="pt-12 animate-[fadeIn_3s_ease-in_forwards] opacity-0">
              <div className="inline-flex items-center gap-3 px-6 py-2 border border-slate-900">
                <Heart className="w-3 h-3 text-slate-700" />
                <span className="text-[10px] tracking-widest text-slate-700">THANK YOU FOR STAYING</span>
                <Heart className="w-3 h-3 text-slate-700" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
