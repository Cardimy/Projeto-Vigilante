import React, { useState, useEffect, useMemo } from "react";
import { Dumbbell, Activity } from "lucide-react";

const STORAGE_KEY = "projeto-vigilante-progress";

function ConfettiBurst({ active, burstId }) {
  const pieces = useMemo(() => {
    if (!active) return [];
    const colors = ["#facc15", "#fbbf24", "#f59e0b", "#eab308", "#fde047", "#ffffff"];
    return Array.from({ length: 90 }).map((_, i) => ({
      id: `${burstId}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 2.2 + Math.random() * 1.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
      width: 6 + Math.random() * 6,
      height: 4 + Math.random() * 6,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burstId, active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: "-10px",
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
}

export default function ProjetoVigilante() {

  const [checkedItems, setCheckedItems] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const [toastText, setToastText] = useState("");

  // Carrega o progresso salvo assim que a página abre
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCheckedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Não foi possível carregar o progresso salvo.");
    } finally {
      setLoaded(true);
    }
  }, []);

  // Salva sempre que o progresso muda (depois do carregamento inicial)
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
  }, [checkedItems, loaded]);

  const toggleExercise = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getWorkoutProgress = (title, exercises) => {
    const completed = exercises.filter(
      (_, i) => checkedItems[`${title}-${i}`]
    ).length;

    return {
      completed,
      total: exercises.length,
      percentage:
        exercises.length > 0
          ? Math.round((completed / exercises.length) * 100)
          : 0,
    };
  };

  const celebrateWorkout = (title) => {
    setBurstId((id) => id + 1);
    setCelebrating(true);
    setToastText(`Treino de ${title} concluído! ⚔️`);
    setTimeout(() => setCelebrating(false), 3000);
    setTimeout(() => setToastText(""), 2600);
  };

  const resetWeek = () => {
    if (window.confirm("Resetar todos os treinos da semana? Isso vai desmarcar tudo.")) {
      setCheckedItems({});
    }
  };

  const treinos = [

    {
      title: "Segunda",
      focus: "Força e volume de upper, com ênfase em bíceps",
      exercises:
      [
        "Puxada alta — 1×12 + 4×6-8",
        "Remada curvada — 4x6-8",
        "Supino inclinado — 3×6",
        "Supino reto — 3×8",
        "Desenvolvimento — 4×8",
        "Rosca alternada — 3×8–10",
        "Rosca inclinada — 3×8–10",
      ],
    },

    {
      title: "Terça",
      focus: "Volume máximo em quadríceps e panturrilha",
      exercises:
      [
        "Agachamento livre — 1×12 + 4×8-10",
        "Agachamento máquina - 3×6",
        "Extensora — 3×10-12",
        "Flexora — 3×10–12",
        "Panturrilha em pé — 4×15",
      ],
    },

    {
      title: "Quarta",
      focus: "Se manter ativo e deixar os músculos descansarem",
      exercises:
      [
        "Descanso ativo: Cardio + Mobilidade",
      ],
    },

    {
      title: "Quinta",
      focus: "Upper com foco em volume e ênfase em bíceps",
      exercises: [
        "Supino com halteres — 1×12 + 4×8",
        "Crucifixo máquina — 4×10–12",
        "Remada unilateral — 3×10-12",
        "Puxada alta neutra — 3×8",
        "Elevação lateral — 4×12–15",
        "Tríceps corda — 3×8–10",
        "Tríceps francês — 3×8–10",
      ],
    },

    {
      title: "Sexta",
      focus: "Força e hipertrofia de posterior",
      exercises: [
        "Agachamento livre — 1×12 + 4×8-10",
        "Leg press 45° — 4×10",
        "Extensora — 3×10-12",
        "Flexora — 3×10–12",
        "Stiff — 4×10",
      ],
    },

    {
      title: "Sábado",
      focus: "Potência, explosão e condicionamento metabólico",
      exercises: [
        "Levantamento terra — 1×12 + 3x6",
        "Agachamento com salto — 3x10",
        "Flexão pliométrica — 3x10",
        "Remada TRX — 3x10",
        "Abdominal na máquina — 3x15",
        "Elevação de pernas — 3x15",
        "Prancha isométrica — 3x falha",
        "Remo ergométrico — 250m, 6–8 rounds",
      ],
    },

    {
      title: "Domingo",
      focus: "Repouso também faz parte do crescimento",
      exercises:
      [
        "Descanso total",
      ],
    },

  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-10 font-sans relative">

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes toast-pop {
          0% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
          15% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          85% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -10px) scale(0.95); }
        }
      `}</style>

      <ConfettiBurst active={celebrating} burstId={burstId} />

      {toastText && (
        <div
          className="fixed top-8 left-1/2 z-[110] bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-2xl"
          style={{ animation: "toast-pop 2.6s ease-in-out forwards" }}
        >
          {toastText}
        </div>
      )}

      {/* HEADER */}
      <header className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-yellow-400 tracking-tight drop-shadow-lg">
          🦇<br></br>Projeto Vigilante
        </h1>
        <p className="text-neutral-400 mt-4 text-lg">
          Cada série é uma decisão sobre quem você quer ser
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto flex flex-col gap-12">

        {/* GRID PRINCIPAL */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Estrutura Semanal */}
          <div className="
            bg-neutral-900/60
            border border-neutral-800
            rounded-xl
            shadow-lg
            backdrop-blur-sm
            hover:scale-[1.01]
            hover:border-yellow-500/40
            transition-all
            duration-200
          ">
            <div className="p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-yellow-400 mb-4">
                <Dumbbell size={20} /> Rotina semanal
              </h2>

              <ul className="text-neutral-300 space-y-3 leading-relaxed">
                <li><strong>Segunda:</strong> Treino de Upper + Bíceps</li>
                <li><strong>Terça:</strong> Treino de Lower</li>
                <li><strong>Quarta:</strong> Descanso ativo</li>
                <li><strong>Quinta:</strong> Treino de Upper + Tríceps</li>
                <li><strong>Sexta:</strong> Treino de Lower</li>
                <li><strong>Sábado:</strong> Treino de explosão</li>
                <li><strong>Domingo:</strong> Descanso total</li>
              </ul>
            </div>
          </div>

          {/* Diretrizes */}
          <div className="
            bg-neutral-900/60
            border border-neutral-800
            rounded-xl
            shadow-lg
            backdrop-blur-sm
            hover:scale-[1.01]
            hover:border-yellow-500/40
            transition-all
            duration-200
          ">
            <div className="p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-yellow-400 mb-4">
                <Activity size={20} /> Diretrizes
              </h2>

              <div className="text-neutral-300 space-y-2 leading-relaxed">
                <p><strong>Descanso:</strong></p>
                <p>60–90s principais / 30–60s auxiliares.</p>
                <p> </p>
                <p><strong>Progressão:</strong></p>
                <p>Aumente a carga de forma recorrente.</p>
                <p> </p>
                <p><strong>Mobilidade:</strong></p>
                <p>5–10 min antes e após treinos.</p>
                <p> </p>
                <p><strong>Sono:</strong></p>
                <p>7–9h por noite.</p>
                <p> </p>
                <p><strong>Nutrição:</strong></p>
                <p>Alta proteína e carboidratos complexos.</p>
                <p> </p>
              </div>
            </div>
          </div>

        </section>

        {/* TREINOS */}
        <section className="flex flex-col gap-10">
          {treinos.map((treino, index) => {

            const progress = getWorkoutProgress(treino.title, treino.exercises);
            const treinoCompleto = progress.completed === progress.total;

            return (
              <div key={index} className="bg-neutral-900/60 border border-neutral-800 rounded-xl shadow-lg backdrop-blur-sm hover:scale-[1.01] hover:border-yellow-500/40 transition-all duration-200">
                <div className="p-8">

                  <h3 className="text-3xl font-bold text-yellow-400 mb-5 tracking-wide">
                    {treino.title}
                  </h3>

                  {/* Barra de progresso */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-neutral-400 mb-2">
                      <span>{progress.completed}/{progress.total} concluídos</span>
                      <span>{progress.percentage}%</span>
                    </div>

                    <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-500 ease-out"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Exercícios */}
                  <div className="space-y-3">
                    {treino.exercises.map((ex, i) => {
                      const exerciseId = `${treino.title}-${i}`;

                      return (
                        <label
                          key={exerciseId}
                          className="flex items-start gap-3 py-2 transition-all cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checkedItems[exerciseId] || false}
                            onChange={() => toggleExercise(exerciseId)}
                            className="h-5 w-5 mt-1 flex-shrink-0 accent-yellow-400"
                          />
                          <span
                            className={`text-sm md:text-lg leading-relaxed transition-all ${
                              checkedItems[exerciseId]
                                ? "line-through text-neutral-500"
                                : "text-neutral-300"
                            }`}
                          >
                            {ex}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <p className="text-sm text-neutral-500 mt-5 italic">
                    Foco: {treino.focus}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      disabled={!treinoCompleto}
                      onClick={() => celebrateWorkout(treino.title)}
                      className={`
                        px-4 py-2 rounded-lg font-semibold transition-all
                        ${
                          treinoCompleto
                            ? "bg-green-600 hover:bg-green-500 scale-100 animate-pulse"
                            : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                        }
                      `}
                    >
                      ✅ Concluir treino
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </section>

        {/* CALL TO ACTION */}
        <section className="text-center mt-10 flex flex-col items-center gap-4">
          <p className="text-neutral-500">Missão: tornar-se uma arma de combate.</p>

          <button className="bg-amber-500 text-black font-semibold px-10 py-4 rounded-xl shadow-lg hover:bg-amber-400 transition-all">
            Treine com propósito ⚔️
          </button>

          <button
            onClick={resetWeek}
            className="text-sm text-neutral-500 hover:text-red-400 underline underline-offset-4 transition-all mt-2"
          >
            🗑 Resetar semana
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto text-center text-neutral-600 mt-16 text-xs tracking-wide">
        Projeto Vigilante — Desenvolvido por Marçelo
      </footer>
    </div>
  );
}
