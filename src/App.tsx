import { useGame } from "./context/GameContext";
import { SetupForm } from "./components/SetupForm";
import { GameBoard } from "./components/GameBoard";

const AppContent = () => {
  // Llamamos al estado
  const { status } = useGame();
  // En función de que valor tenga el "status" mostraremos en el componente app el formulario o el tablero.
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col overflow-x-hidden">
      <div className="flex-grow w-full max-w-md mx-auto p-4 sm:p-6 md:max-w-2xl lg:max-w-4xl">
        {status === "setup" ? <SetupForm /> : <GameBoard />}
      </div>
    </div>
  );
};

export function App() {
  return <AppContent />;
}

export default App;
