import React, { useState } from "react";
import { Dumbbell, Activity } from "lucide-react";

export default function ProjetoVigilante() {

  const [checkedItems, setCheckedItems] = useState({});

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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-10 font-sans">
      {/* HEADER */}
      <header className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-yellow-400 tracking-tight drop-shadow-lg">
          🦇<br></br>Projeto Vigilante
        </h1>
        <p className="text-neutral-400 mt-4 text-lg">
          Se tornando uma pessoa melhor com a guarda de São Miguel Arcanjo
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

              <ul className="text-neutral-300 space-y-2 leading-relaxed">
                <li><strong>Segunda:</strong> <p> </p> Treino de Upper + Tríceps</li>
                <p> </p>
                <li><strong>Terça:</strong> <p> </p> Treino de Lower (Quadríceps + Panturrilha)</li>
                <p> </p>
                <li><strong>Quarta:</strong> <p> </p> Descanso ativo</li>
                <p> </p>
                <li><strong>Quinta:</strong> <p> </p> Treino de Upper + Bíceps</li>
                <p> </p>
                <li><strong>Sexta:</strong> <p> </p> Treino de Lower (Posterior + Glúteos)</li>
                <p> </p>
                <li><strong>Sábado:</strong> <p> </p> Treino de explosão</li>
                <p> </p>
                <li><strong>Domingo:</strong> <p> </p> Descanso total</li>
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
          {[

            {
              title: "Segunda",
              focus: "Força e volume de upper, com ênfase em tríceps",
              exercises:
              [
                "Remada Cavalinho (T-bar row) — 1×12 + 4×6",
                "Remada baixa no cabo (triângulo ou pegada neutra) — 4x8",
                "Supino inclinado com halteres — 3×6",
                "Supino reto com barra — 3×8",
                "Desenvolvimento com halteres — 4×8",
                "Rosca scott com barra W (skull crusher) — 3×8–10",
                "Rosca alternada com halteres — 3×8–10",
                "Rosca inclinada com halteres — 3×8–10",
              ],
            },

            {
              title: "Terça",
              focus: "Volume máximo em quadríceps e panturrilha",
              exercises:
              [
                "Agachamento livre — 1×12 + 4×6",
                "Leg press 45° — 4×10",
                "Hack squat — 3×10–12",
                "Agachamento búlgaro com halteres — 3×8",
                "Extensora — 3×12",
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
                "Peck deck (crucifixo na máquina) — 4×10–12",
                "Remada Cavalinho (T-bar row) — 3×6",
                "Puxada alta com pegada neutra ou triângulo — 3×8",
                "Elevação lateral com halteres sentado — 4×12–15",
                "Tríceps testa com barra (skull crusher) — 3×8–10",
                "Tríceps francês com halter (overhead) — 3×8–10",
                "Tríceps corda no cabo — 3×8–10",
              ],
            },

            {
              title: "Sexta",
              focus: "Força e hipertrofia de posterior e glúteos",
              exercises: [
                "Afundo no smith — 1×12 + 4×8",
                "Stiff com halteres — 4×10",
                "Flexora deitada — 4×10–12",
                "Leg press com pés altos e afastados — 4×10",
                "Elevação pélvica — 4×10",
                "Abdução no cabo ou máquina — 3x12–15",
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
                "Elevação de pernas suspenso — 3x15",
                "Prancha isométrica — 3x falha",
                "Remo ergométrico — 250m sprint / descanso 45s, 6–8 rounds",
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

          ].map((treino, index) => {

  const progress = getWorkoutProgress(
    treino.title,
    treino.exercises
  );

  return (
    <div key={index} className="bg-neutral-900/60 border border-neutral-800 rounded-xl shadow-lg backdrop-blur-sm hover:scale-[1.01] hover:border-yellow-500/40 transition-all duration-200">
      <div className="p-8">

        <h3 className="text-3xl font-bold text-yellow-400 mb-5 tracking-wide">
          {treino.title}
        </h3>

        {/* Barra de progresso */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-neutral-400 mb-2">
            <span>
              {progress.completed}/{progress.total} concluídos
            </span>

            <span>
              {progress.percentage}%
            </span>
          </div>

          <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-500 ease-out"
              style={{
                width: `${progress.percentage}%`,
              }}
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
                className="
                  flex items-center gap-3
                  rounded-lg
                  px-3 py-2
                  hover:bg-neutral-800/50
                  transition-all
                  cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={checkedItems[exerciseId] || false}
                  onChange={() => toggleExercise(exerciseId)}
                  className="h-5 w-5 accent-yellow-400"
                />

                <span
                  className={`text-lg transition-all ${
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

      </div>
    </div>
  );
})}
        </section>

        {/* CALL TO ACTION */}
        <section className="text-center mt-10">
          <p className="text-neutral-500 mb-4">Missão: tornar-se uma arma de combate.</p>
          <button className="bg-amber-500 text-black font-semibold px-10 py-4 rounded-xl shadow-lg hover:bg-amber-400 transition-all">
            Treine com propósito ⚔️
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